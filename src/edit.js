/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { createElement } from '@wordpress/element'; //React.createElement


// const {createElement} = wp.element; //React.createElement


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
/**
 * Load this even that it's empty
 * So an empty index.css is created by 'build'
 * which is needed to register a dependecy for 
 * 'wp-block-comments' styles
 *
 * which is ... indeed .. an ugly hack
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit() {
	const ALLOWED_BLOCKS = [
        'core/group',
        'core/paragraph',
        'core/heading',
        'core/buttons',
        'core/button'
    ];
    const domain_input_field = createElement('input', { class: 'domain_request', type: 'text', placeholder: 'xyz.figuren.theater' })

    const TEMPLATE = [
        [ 'core/group', { style:{border:{radius:'10px'},spacing:{blockGap:'100px'}},backgroundColor:'white',className:'wp-block-post-comments',layout:{type:'flex',orientation:'vertical',justifyContent:'center'} }, [
            [ 'core/heading', { content: "Ist Deine Domain noch frei?", textAlign: 'center', level: 3 } ],
	        [ 'core/group', { templateLock: 'all', layout:{type:'flex',flexWrap:'wrap'} }, [
                [ 'core/paragraph', { content: [ domain_input_field ] } ],
                [ 'core/buttons', {}, [
                    [ 'core/button', { className: 'get_domain_request', text: "Jetzt Verfügbarkeit prüfen!", title: 'Checke Deinen gewünschten Domainnamen auf Verfügbarkeit.', url: '#'} ]
                ] ]
	        ] ]
        ] ]
    ];
    // const TEMPLATE = [
    //     [ 'core/group', { templateLock: 'all',style:{border:{radius:'10px'}},backgroundColor:'white',className:'wp-block-post-comments',layout:{type:'flex',orientation:'vertical',justifyContent:'center'} }, [
    //         [ 'core/heading', { content: "Ist Deine Domain noch frei?", textAlign: 'center', level: 3 } ],
    //         [ 'core/columns', { templateLock: 'all' }, [
    //             [ 'core/column', { templateLock: 'all' }, [
    //                 [ 'core/paragraph', { content: [ domain_input_field ] } ],
    //             ] ],
    //             [ 'core/column', { verticalAlignment: 'center', templateLock: 'all' }, [
    //                 [ 'core/button', { className: 'get_domain_request', text: "Jetzt Verfügbarkeit prüfen!", title: 'Check Deinen Domainnamen auf Verfügbarkeit.', url: '#'} ],
    //             ] ],
    //         ] ]
    //     ] ]
    // ];
	return (
		<div { ...useBlockProps() }>
            <InnerBlocks
                allowedBlocks={ ALLOWED_BLOCKS }
                template={ TEMPLATE }
                // templateLock="all"
            />
		</div>
	);
}
