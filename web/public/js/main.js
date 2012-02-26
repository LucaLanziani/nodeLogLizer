$(document).ready(function(){
	$(".l_menu").each(function(){
		if ( $(this).attr("menu") == menu ){
			
			$(this).addClass("selected_menu");
			
			$(this).find(".u_submenu .l_submenu").each(function(){
				
				if ( $(this).attr("submenu") == submenu ){
					$(this).addClass("selected_submenu");
				
					$(this).find(".u_substream .l_substream").each(function(){
						console.log($(this));
						if ( $(this).attr("substream") == substream )
							$(this).addClass("selected_substream");
					});
				}
				
			});
		}
	});
	
});