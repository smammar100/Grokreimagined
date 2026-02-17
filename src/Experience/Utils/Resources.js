import * as THREE from 'three/webgpu'
import EventEmitter from './EventEmitter.js'

//import Obfuscate from '@experience/Utils/Helpers/Obfuscate.js';
import Experience from "@experience/Experience.js";

export default class Resources extends EventEmitter {
    experience = Experience.getInstance()
    renderer = experience.renderer.instance

    constructor( sources ) {
        super()

        this.sources = sources
        // this.sourcesFilter()
        // this.obfuscate = Obfuscate.getInstance()

        this.items = {}
        this.toLoad = this.sources.length
        this.loaded = 0
        this.loadedAll = false

        const typesUsed = new Set( this.sources.map( ( s ) => s.type ) )
        this.setLoaders( typesUsed )
        this.startLoading()
    }

    sourcesFilter() {
        if ( import.meta.env.MODE === "development" ) {
            return true
        }

        this.sources.forEach( source => {
            if ( source.obfuscate === true ) {
                if ( source.type.match( /model/i ) ) {
                    // replace .glb, .gltf, .obj with .bin
                    source.path = source.path.replace( /\.(glb|gltf|obj)/i, '.bin' )
                    source.type = 'binModel'
                }

                if ( source.type === 'json' ) {
                    // replace image name to .bin
                    source.path = source.path.replace( /\.(json)/i, '.bin' )
                    source.type = 'binJson'
                }

                if ( source.type.match( /texture/i ) ) {
                    // replace image name to .bin
                    source.path = source.path.replace( /\.(jpg|jpeg|png)/i, '.bin' )
                    source.type = 'binTexture'
                }
            }
        } )
    }

    setLoaders( typesUsed ) {
        this.loaders = {}
        this.loaders.textureLoader = new THREE.TextureLoader()
        this.loaders.AudioLoader = new THREE.AudioLoader()

        if ( typesUsed.has( 'cubeTexture' ) ) {
            this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader()
        }

        // Loaders created on first use in startLoading (lazy init for DRACO, KTX2, EXR, HDR, Font, OBJ, GLTF)
        this._loaderPromises = {}
    }

    _ensureGltfLoader() {
        if ( !this._loaderPromises.gltfLoader ) {
            this._loaderPromises.gltfLoader = this._initGltfLoaders()
        }
        return this._loaderPromises.gltfLoader
    }

    _ensureObjLoader() {
        if ( !this._loaderPromises.objLoader ) {
            this._loaderPromises.objLoader = import( 'three/addons/loaders/OBJLoader.js' ).then( ( { OBJLoader } ) => {
                this.loaders.objLoader = new OBJLoader()
                return this.loaders.objLoader
            } )
        }
        return this._loaderPromises.objLoader
    }

    _ensureHDRLoader() {
        if ( !this._loaderPromises.HDRLoader ) {
            this._loaderPromises.HDRLoader = import( 'three/examples/jsm/loaders/HDRLoader.js' ).then( ( { HDRLoader } ) => {
                this.loaders.HDRLoader = new HDRLoader()
                return this.loaders.HDRLoader
            } )
        }
        return this._loaderPromises.HDRLoader
    }

    _ensureEXRLoader() {
        if ( !this._loaderPromises.EXRLoader ) {
            this._loaderPromises.EXRLoader = import( 'three/examples/jsm/loaders/EXRLoader.js' ).then( ( { EXRLoader } ) => {
                this.loaders.EXRLoader = new EXRLoader()
                return this.loaders.EXRLoader
            } )
        }
        return this._loaderPromises.EXRLoader
    }

    _ensureFontLoader() {
        if ( !this._loaderPromises.fontLoader ) {
            this._loaderPromises.fontLoader = import( 'three/examples/jsm/loaders/FontLoader.js' ).then( ( { FontLoader } ) => {
                this.loaders.fontLoader = new FontLoader()
                return this.loaders.fontLoader
            } )
        }
        return this._loaderPromises.fontLoader
    }

    async _initGltfLoaders() {
        const [ { GLTFLoader }, { DRACOLoader }, { KTX2Loader }, { MeshoptDecoder } ] = await Promise.all( [
            import( 'three/examples/jsm/loaders/GLTFLoader.js' ),
            import( 'three/examples/jsm/loaders/DRACOLoader.js' ),
            import( 'three/examples/jsm/loaders/KTX2Loader.js' ),
            import( 'three/examples/jsm/libs/meshopt_decoder.module.js' ),
        ] )
        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath( '/draco/' )
        const ktx2Loader = new KTX2Loader()
        ktx2Loader.setTranscoderPath( '/basis/' )
        await ktx2Loader.detectSupportAsync( this.renderer )
        this.loaders.gltfLoader = new GLTFLoader()
        this.loaders.gltfLoader.setDRACOLoader( dracoLoader )
        this.loaders.gltfLoader.setKTX2Loader( ktx2Loader )
        this.loaders.gltfLoader.setMeshoptDecoder( MeshoptDecoder )
        return this.loaders.gltfLoader
    }

    async startLoading() {
        // Load each source
        for ( const source of this.sources ) {
            switch ( source.type ) {
                case 'binModel':
                    this.obfuscate.loadFile( source.path, ( arrayBuffer ) => {
                        this.obfuscate.decode( arrayBuffer, source.path, ( model ) => {
                            this.sourceLoaded( source, model )
                        } )
                    } )
                    break

                case 'binJson':
                    this.obfuscate.loadFile( source.path, ( arrayBuffer ) => {
                        this.obfuscate.decode( arrayBuffer, source.path, ( json ) => {
                            this.sourceLoaded( source, json )
                        } )
                    } )
                    break

                case 'binTexture':
                    this.obfuscate.loadFile( source.path, ( arrayBuffer ) => {
                        this.obfuscate.decode( arrayBuffer, source.path, ( textureBuffer ) => {

                            const blob = new Blob( [ textureBuffer ] );
                            createImageBitmap( blob ).then( ( imageBitmap ) => {
                                const texture = new THREE.Texture( imageBitmap );
                                texture.needsUpdate = true;
                                //texture.colorSpace = THREE.SRGBColorSpace;
                                this.sourceLoaded( source, texture );
                            } ).catch( err => console.error( "Error texture loading:", err ) );


                            // // Convert the array of data into a base64 string
                            // const encodedData = btoa( new Uint8Array( textureBuffer ).reduce( function ( data, byte ) {
                            //     return data + String.fromCharCode( byte );
                            // }, '' ) );
                            // const dataURI = "data:image/jpeg;base64," + encodedData;
                            //
                            // this.loaders.textureLoader.load(
                            //     dataURI,
                            //     ( file ) => {
                            //         // Default settings
                            //         file.colorSpace = THREE.SRGBColorSpace;
                            //
                            //         this.sourceLoaded( source, file )
                            //     }
                            // )

                        } )
                    } )
                    break

                case 'gltfModel':
                    const gltfLoader = await this._ensureGltfLoader()
                    gltfLoader.load(
                        source.path,
                        ( file ) => {
                            this.sourceLoaded( source, file )
                        }
                    )
                    break

                case 'objModel':
                    await this._ensureObjLoader()
                    this.loaders.objLoader.load(
                        source.path,
                        ( file ) => {
                            this.sourceLoaded( source, file )
                        }
                    )
                    break

                case 'texture':
                    this.loaders.textureLoader.load(
                        source.path,
                        ( file ) => {
                            // Default settings
                            //file.colorSpace = THREE.SRGBColorSpace;

                            this.sourceLoaded( source, file )
                        }
                    )
                    break

                case 'videoTexture':
                    let videoElement = document.createElement( 'video' )
                    videoElement.src = source.path
                    videoElement.setAttribute( 'crossorigin', 'anonymous' )
                    videoElement.muted = true
                    videoElement.loop = true
                    videoElement.load()
                    videoElement.setAttribute( 'playsinline', '' )
                    videoElement.setAttribute( 'webkit-playsinline', '' )
                    videoElement.play()

                    const obj = {
                        videoTexture: new THREE.VideoTexture( videoElement ),
                        videoElement: videoElement
                    }

                    videoElement.addEventListener( 'canplaythrough', () => {
                        this.sourceLoaded( source, obj )
                    } )
                    break

                case 'cubeTexture':
                    this.loaders.cubeTextureLoader.load(
                        source.path,
                        ( file ) => {
                            this.sourceLoaded( source, file )
                        }
                    )
                    break

                case 'rgbeTexture':
                    await this._ensureHDRLoader()
                    this.loaders.HDRLoader.load(
                        source.path,
                        ( file ) => {
                            this.sourceLoaded( source, file )
                        }
                    )
                    break

                case 'hdrTexture':
                    await this._ensureHDRLoader()
                    this.loaders.HDRLoader.load(
                        source.path,
                        ( file ) => {
                            this.sourceLoaded( source, file )
                        }
                    )
                    break

                case 'exrTexture':
                    await this._ensureEXRLoader()
                    this.loaders.EXRLoader.load(
                        source.path,
                        ( file ) => {
                            this.sourceLoaded( source, file )
                        }
                    )
                    break

                case 'font':
                    await this._ensureFontLoader()
                    this.loaders.fontLoader.load(
                        source.path,
                        ( file ) => {
                            this.sourceLoaded( source, file )
                        }
                    )
                    break

                case 'audio':
                    this.loaders.AudioLoader.load(
                        source.path,
                        ( file ) => {
                            this.sourceLoaded( source, file )
                        }
                    )
                    break
                case 'json':
                    fetch( source.path ).then(
                        response => {
                            response.json().then(
                                data => {
                                    this.sourceLoaded( source, data )
                                    return data
                                }
                            )
                        }
                    )
                    break
            }

        }

        if ( this.sources.length === 0 ) {
            setTimeout( () => {
                this.loadedAll = true
                this.trigger( 'ready' )
            } );
        }
    }

    sourceLoaded( source, file ) {
        this.items[ source.name ] = file

        this.loaded++

        if ( this.loaded === this.toLoad ) {
            this.loadedAll = true
            this.trigger( 'ready' )
        }
    }
}
