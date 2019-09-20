"use strict"

function View( path = null )
{
    const selector_form = `${path} input, ${path} select, ${path} textarea, ${path} super-foto, ${path} super-text`
    const query   = selector => document.querySelectorAll( selector )
    const element = () => Object.values( query( path ) )
    const loop    = ( fn ) => 
    {
        element().forEach( fn )
    }
    const map    = ( fn ) => 
    {
        return element().map( fn )
    }
    const reduce    = ( fn, int = {} ) => 
    {
        return element().reduce( fn, int )
    }
    const tpl = ( obj ) => 
    {
        let str = path
        Object.keys( obj ).forEach( key => {
            console.log( )
            str = str.replace( `{{${key}}}`, obj[key] || '' )
        } )
        return str
    }
    const hidden   = () => 
    {
        loop( el => {
            el.setAttribute( 'hidden', '' )
        } )
    }
    const show     = () => 
    {
        loop( el => {
            el.removeAttribute( 'hidden' )
        } )
    }
    const html     = ( str = null ) => 
    {
        if ( !str ) 
        {
            return map( el => el.innerHTML || '' )
        } else {
            loop( el => { el.innerHTML = str }  )
            return true
        }
    }
    const val     = ( str = null ) => 
    {
        if ( !str ) 
        {
            return map( el => el.value || '' )
        } else {
            loop( el => { el.value = str }  )
            return true
        }
    }
    const form     = ( obj = null ) => {
        path = selector_form
        if ( !obj ) 
        {
            return reduce( ( acc, el ) => {
                if( el.name ) {
                    acc[el.name] = el.value || el.innerHTML || ''
                }
                return acc
            } )
        } else {
            loop( el => { 
                switch ( el.nodeName ) {
                    case 'INPUT':
                            el.value = obj[el.name] || el.value
                            if( el.type == 'radio' || el.type == 'checkbox' ) 
                            {
                                if( el.value || false )
                                {
                                    el.setAttribute( 'checked', '' )
                                }
                            }
                        break;
                    case 'SELECT':
                            el.setAttribute( 'selected', '' )
                        break;
                    case 'TEXTAREA':
                            el.innerHTML = obj[el.name] || ''
                        break;
                
                    default:
                        break;
                }
            }  )
            return true
        }
    }
    const removeAcentos = ()  => 
    { 
        let val = path
        val     = val.replace( /[áàãâä]/gi, 'a')
        val     = val.replace( /[éèêë]/gi, 'e')
        val     = val.replace( /[íìîï]/gi, 'i')
        val     = val.replace( /[óòõôö]/gi, 'o')
        val     = val.replace( /[úùûü]/gi, 'u')
        val     = val.replace( /[ç]/gi, 'c')
        return val
    }
    const slug      = () =>
    {
        let val  = removeAcentos()
        val      = val.replace( /[^a-z0-9]/gi, '_')
        val      = val.replace( /_+/gi, '-')
        val      = val.replace( /-+/gi, '-')
        val      = val.toLocaleLowerCase()
       val       = val.replace( /\W/gi, '-' )
       return val
    }
    const bind   = () => 
    {
        path = '[bind]'
        loop( el => {
            el.addEventListener('input', function () {
                let param = props( el )
                let sel   = param.bind || ''

                document
                    .querySelectorAll( `.${sel}` )
                    .forEach( elemento => {
                        elemento.innerHTML = valor;
                    } )
            })
        } )
    }
    const masc     = ( pattern ) => 
    {
        loop( el => {
            el.addEventListener( 'input', function( e ) {
                let texto   = this.value.replace( /\D/gi, '' )
                let max     = pattern.length
                let escrito = this.value.length
                let corta   = escrito > max ? max : escrito
                let count   = 0
                let result  = pattern.split('').map( x => {
                    if( x == '9' ) {
                        let n =  texto.split('')[count]
                        count++
                        return n
                    }
                    return x
                } )
                el.value = result.join('').substr( 0, max )
            } )
        } )
    }
    const previa   = ( fn = null ) => 
    {
        path = '[preview]'
        loop( el => {
            el.addEventListener( 'change', function( action ) {
                let param    = props( el )
                let sel      = param.preview || ''

                console.dir( sel )
                if ( this.files && this.files[0] )
                {
                    let reader                 = new FileReader()
                    reader.onload              = ( e ) =>  {
                        let img                = e.srcElement.result
                        Object.values( document.querySelectorAll( `.${sel}` ) )
                            .forEach( i => {
                                i.src = img
                            } )

                        if( fn ) { fn( window.btoa(img) ) }                        
                    }
                    reader.readAsDataURL( this.files[0] );
                }
            } )
        } )
    }
    const props    = ( item ) => {
        return Object.values( item.attributes ).reduce( ( acc, el ) => {
            acc[el.name] = el.value
            return acc
        }, {} )
    }
    const ex       = {
        path,
        element,
        hidden,
        loop,
        show,
        html,
        val,
        map,
        tpl,
        selector_form,
        form,
        removeAcentos,
        slug,
        masc,
        previa,
        props,
    }

    return ex
}

function $( path ) {
    return View( path )
}
