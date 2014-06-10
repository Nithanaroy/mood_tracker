$(function () {
	$(".datepicker").datepicker({
		showOn: "button",
		buttonImage: "/images/calendar.gif",
		buttonImageOnly: true,
		dateFormat: 'yy-mm-dd'
	});

	$("#moods_for_date").datepicker("option", "onSelect", 
		function(dateText){
            $.ajax({
            	url: '/moods/list',
            	data: {date: dateText},
            	method: 'GET',
            	success: function(data) {
            		$("#moods_list").html(data);
            		update_notice("Fetched list for " + date_format(dateText), 'alert-success')
            	},
            	error: function(data) {
            		update_notice(data, 'alert-error');
            	}
            });
        });

	// For now it is used for save mood. Hence not generic
	$("form.ajax").submit(function() {
		$.ajax({
        	url: $(this).attr('action'),
        	data: $(this).serialize(),
        	method: $(this).attr('method'),
        	success: function(data) {
        		update_notice(data, 'alert-success');
        		after_mood_save();
        	},
        	error: function(xhr) {
        		// $.parseJSON(xhr.responseText).errors
            	update_notice('Something doesnt seem right!', 'alert-danger');
        	}
        });
        return false;
	});

	function after_mood_save() {
		$("#mood_entry label").each(function() {
			if ($(this).css("opacity") != 1) $(this).hide(300);
		});
		$("#mood_save").hide();
	}

	// change the opacity of smileys
	$("#mood_entry :radio").click(function() {
	    $(this).closest("div#mood_entry").children().css({opacity: 0.3});
	    var id = $(this).attr("id");
	    $(this).siblings("label#"+id+"_label").css({opacity: 1});
	});

	function update_notice (html, css_class) {
		var alert_classes = ['alert-info', 'alert-success', 'alert-warning', 'alert-danger'];
		css_class = alert_classes.indexOf(css_class) >= 0 ? css_class : 'alert-info';
		$(".alert").removeClass(alert_classes.join(" ")).addClass(css_class).html(html);
	}

	function date_format(date_str) {
		var months = ['Jan', "Feb", 'Mar', 'Arp', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		var d = new Date(date_str);
		return d.getDate() + " " + months[d.getMonth()] + ", " + d.getFullYear() 
	}
})