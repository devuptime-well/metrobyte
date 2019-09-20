"use strict"

function Api( path, base = null )
{
    const base_uri = () => 
    {
        if( !base )
        {
            base = window.location.protocol + '//' + window.location.hostname.replace( 'www.', '' ) 
        }
        return base
    }
    const options  = () => 
    ( {
        headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
        credentials: "same-origin",
        method: 'POST',
        mode: 'cors',
        cache: 'default',
        body: null
    } )
    function obj_to_url( obj ) 
    {
        let indices =  Object.keys( obj );
        let url     = indices.map( i => `${i}=${obj[i]}` ).join('&');
        return encodeURI( url );            
    }
    const post = async ( data, fn = null ) => 
    {
        let end_point = base_uri() + path
        let dados     = obj_to_url( data )
        let opt       = options()
        opt.body      = dados
        try {            
            let request   = await fetch( end_point, opt )
            let res       = await request.json()
            if( fn ) { fn( res ) }        
            return res
        } catch (error) {
            console.log( 'ERROR: PATH' )
            return false            
        }
    }
    const get  = async ( data, fn = null ) => 
    {
        let dados     = obj_to_url( data )
        let end_point = base_uri() + path + "?" + dados
        try {            
            let request   = await fetch( end_point )
            let res       = await request.json()
            if( fn ) { fn( res ) }       
            return res
        } catch (error) {
            console.log( 'ERROR: PATH' )
            false
        }
    }
    const ex = {
        path,
        options,
        post,
        get,
        base_uri,
        obj_to_url
    }
    return ex
}
