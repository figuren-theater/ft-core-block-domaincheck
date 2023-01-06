const generateResponse = ( msg ) => {
	// Create the new element
	// This can be any valid HTML element: p, article, span, etc...
	const p = document.createElement('p');
	// Add content to the new element
	// p.innerHTML = msg;
	p.insertAdjacentHTML('beforeend', msg );
	return p;
}

const requestDomain = async ( domain_name, target ) => {

	const response = await fetch('/ajax-api/domain-request/' + domain_name + '/' ); // ending slash prevents 301
	const json = await response.json();

	// console.log(json.data.validated_ft.errors.errors);
	// console.log({json});


	// Get the element you want to add your new element before or after
//	var target = document.querySelector('#get_domain_request');


	// Get the button, to reset the text
	var button = target.querySelector('a');

	if (typeof json.data.validated[0].errors.errors.blogname !== 'undefined') {

		button.innerHTML = '💩. Neuer Versuch!';

		json.data.validated[0].errors.errors.blogname.forEach(function (error, index) {
	//		console.log(index) // index
	//		console.log(error) // value

			// Insert the element after our target element
			target.parentNode.insertBefore( generateResponse( error ), target.nextSibling );
		});

	} else {

		button.innerHTML = '🎉 ✨ 🎊 🌟 💖 💫';

		// Create the new element
		// This can be any valid HTML element: p, article, span, etc...
		// var p = document.createElement('p');

		// Add content to the new element
		// p.innerHTML = 'Yeah! Diese Domain ist frei, schnapp sie Dir!';

		// You could also add classes, IDs, and so on
		// div is a fully manipulatable DOM Node

		// Insert the element before our target element
		//target.parentNode.insertBefore( div, target );

		// Insert the element after our target element

		json.data.validated.forEach( (valid_data) => {
			const { domain } = valid_data
			// const em = document.createElement('em');
			const em = `<strong>${domain}</strong>`;
			const link = `<a href="mailto:info@figuren.theater?subject=Ich%20will%20${domain}" title="">schnapp sie Dir</a>`;
			const msg = `Yeah! ${em} ist frei, ${link}!`
			// em.innerHTML = domain + ' ist frei, schnapp sie Dir!';
// console.log(em)

			// const msg = em;
			// TODO // use https://developer.mozilla.org/de/docs/Web/API/Element/insertAdjacentHTML
			target.parentNode.insertBefore( generateResponse( msg ), target.nextSibling );
		} );



	}

}

window.onload = function() {

	// document.querySelectorAll('.get_domain_request>a')

	const domain_request_block_selector       = '.wp-block-figurentheater-ft-core-block-domaincheck';
	const domain_request_group_block_selector = '.wp-block-group:not(.wp-block-post-comments)';
	const domain_request_input_selector       = '.domain_request';
	const domain_request_button_selector      = '.get_domain_request > a';

	const domain_request_inputs  = document.querySelectorAll( domain_request_input_selector );
	const domain_request_buttons = document.querySelectorAll( domain_request_button_selector );
	// let all = document.querySelectorAll('.wp-block-figurentheater-ft-core-block-domaincheck');
	// console.log(domain_request_buttons)

	const action = () => {

	}

	domain_request_inputs.forEach( (input) => {
		input.addEventListener('keydown', ( event ) => {
			var key = event.keyCode || event.which;
			if (key==13){
// console.log(event.target);


				const parent = event.target.closest(domain_request_block_selector);
				const group_block = parent.querySelector(domain_request_group_block_selector);
				const button = parent.querySelector(domain_request_button_selector);
				const domain_request = event.target.value;

				button.innerHTML = '...';
				//
				requestDomain( domain_request, group_block );

			}
		} )
	} );


	domain_request_buttons.forEach( (button) => {
		button.addEventListener('click', ( event ) => {
			if( !event.target.matches( domain_request_button_selector ) ) {
				return;
			}
			event.preventDefault();

			event.target.innerHTML = '...';

			const parent = event.target.closest(domain_request_block_selector);
			const group_block = parent.querySelector(domain_request_group_block_selector);
			const domain_request = parent.querySelector(domain_request_input_selector).value;

			//
			requestDomain( domain_request, group_block );
		} )
	} );
} // window.onload
