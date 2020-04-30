(function($){
	/*
	*  acf.screen
	*
	*  Data used by AJAX to hide / show field groups
	*
	*  Extension of ACF inbuilt AJAX functionality
	*/
	//
	// acf.screen = {
	// 	action 								:	'acf/location/match_field_groups_ajax',
	// 	post_id								:	0,
	// 	page_template						:	0,
	// 	page_parent							:	0,
	// 	page_type							:	0,
	// 	post_category						:	0,
	// 	post_format							:	0,
	// 	taxonomy							:	0,
	// 	lang								:	0,
	// 	nonce								:	0,
	// 	woocommerce_product_type			:   0,
	// 	woocommerce_is_in_stock				:   0,
	// 	woocommerce_is_downloadable			:   0,
	// 	woocommerce_is_virtual				:   0,
	// 	woocommerce_is_sold_individually	:   0,
	// 	woocommerce_is_taxable				: 	0,
	// 	woocommerce_is_shipping_taxable	 	:  	0,
	// 	woocommerce_is_reviewable	: 0
	// };

	$(document).ready(function(){
		acf.screen.woocommerce_is_virtual = ($('#_virtual').is(':checked')) ? 1 : 0;
		acf.screen.woocommerce_is_downloadable = ($('#_downloadable').is(':checked')) ? 1 : 0;
		acf.screen.woocommerce_sold_individually = ($('#_sold_individually').is(':checked')) ? 1 : 0;
		acf.screen.woocommerce_is_reviewable = ($('#comment_status').is(':checked')) ? 1 : 0;
		taxable_status();
	});

	$(document).on('change', '#_virtual, #_downloadable, #_sold_individually', function() {
		acf.ajax.update( 'woocommerce_is' + $(this).attr('name'), ($(this).is(':checked')) ? 1 : 0 ).fetch();
		$(document).trigger('acf/update_field_groups');
	});

	$(document).on('change', '#_tax_status', function() {
		taxable_status();
		$(document).trigger('acf/update_field_groups');
	});

	// Reviews Checkbox
	$(document).on('change', '#comment_status', function() {
		acf.ajax.update( 'woocommerce_is_reviewable', ($(this).is(':checked')) ? 1 : 0 ).fetch();
		$(document).trigger('acf/update_field_groups');
	});

	function taxable_status() {
		var status = $('#_tax_status').val();
		if(status === "shipping") {
			acf.ajax
				.update( 'woocommerce_is_taxable', 0 )
				.update( 'woocommerce_is_shipping_taxable', 1 )
				.fetch();
		}
		else if(status === "taxable") {
			acf.ajax
				.update( 'woocommerce_is_taxable', 1 )
				.update( 'woocommerce_is_shipping_taxable', 1 )
				.fetch();
		}
		else {
			acf.ajax
				.update( 'woocommerce_is_taxable', 0 )
				.update( 'woocommerce_is_shipping_taxable', 0 )
				.fetch();
		}
	}

})(jQuery);
