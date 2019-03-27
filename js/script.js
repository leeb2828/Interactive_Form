/**************************************
Lee Haney
Team Treehouse: JavaScript Full Stack Techdegree
Project 3: Interactive Form
**************************************/

// initially hidden
$other_job_role = $('input#other-title');

// displayed by default
$credit_card_div = $('div#credit-card');
// initally hidden
$paypal_div = $credit_card_div.next('div').attr('id', 'paypal');
// initially hidden
$bitcoin_div = $paypal_div.next('div').attr('id', 'bitcoin');


const validations = [
   {
      /*
      "Basic Info" section
      Name:
      */
      id: 'name',
      regExp: /^[a-zA-Z]{3,30}[\s]?([a-zA-Z\.]{0,30})?([\s][a-zA-Z]{1,30})?$/,
      error_message: 'Please enter your name!',
      mode: "regular",
   },
   {
      /*
      "Basic Info" section
      Email:
      */
      id: 'mail',
      regExp: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      error_message: 'Please enter a valid email address!',
      mode: "regular",
   },
   {
      /*
      "Basic Info" section
      "other" job title (initally hidden)
      */
      id: 'other-title',
      regExp: /^.{3,}$/,
      error_message: 'Please enter a job title!',
      mode: "other-title",
   },
   {
      /*
      "Payment Info" section
      Card Number:
      */
      id: 'cc-num',
      regExp: /^\d{13,16}$/,
      error_message: 'Please enter a valid card nunber!',
      mode: "credit-card-section",
   },
   {
      /*
      "Payment Info" section
      Zip Code:
      */
      id: 'zip',
      regExp: /^\d{5}$/,
      error_message: 'Please enter a valid zip code!',
      mode: "credit-card-section",
   },
   {
      /*
      "Payment Info" section
      CVV:
      */
      id: 'cvv',
      regExp: /^\d{3}$/,
      error_message: 'Please enter a valid CVV!',
      mode: "credit-card-section",
   }
]

/*
"Register for Activities" section
*/
const all_activities = [
   {name: "all", timeslot: 0, cost: 200},
   {name: "js-frameworks", timeslot: 1, cost: 100}, // Tuesday 9-12PM
   {name: "js-libs", timeslot: 2, cost: 100}, // Tuesday 1-4PM
   {name: "express", timeslot: 1, cost: 100}, // Tuesday 9-12PM
   {name: "node", timeslot: 2, cost: 100}, // Tuesday 1-4PM
   {name: "build-tools", timeslot: 3, cost: 100}, // Wednesday 9-12PM
   {name: "npm", timeslot: 4, cost: 100}, // Wednesday 1-4PM
]

/*
when the user selects a payment option for
- Credit Card: Shown on page by default (bitcoin and paypal are initially hidden).
- Bitcoin: Will display and (credit card and paypal will be set to hidden).
- Paypal: Will display and (credit card and bitcoin will be set to hidden).
*/
function payment_info_section() {
   /*
   Parameter: The option currently selected in
   the "I'm going to pay with" dropdown menu
   */
   switch ( $('select#payment option:selected').val() ) {
      case 'credit card':
         $credit_card_div.show();
         $paypal_div.hide();
         $bitcoin_div.hide();
         break;
      case 'paypal':
         $paypal_div.show();
         $bitcoin_div.hide();
         $credit_card_div.hide();
         break;
      case 'bitcoin':
         $bitcoin_div.show();
         $paypal_div.hide();
         $credit_card_div.hide();
         break;
   }
}

/*
When the user selects "Other" from the "Job Role" dropdown menu,
a new text box will appear.
However, if you go back and select a different option from the dropdown menu,
the textbox will disappear.
 */
$('select#title').on('change', function() {
   if ($(this).val() === 'other') {
      $other_job_role.show();
      $other_job_role.focus();
   } else {
      $other_job_role.hide();
      // Removes the "Please enter a job title!" error message.
      $('label[for="title"]').children('.error_msg_one').text("");
   }
});

/*
When the user selects a new payment option under the "Payment Info" section,
the information below gets updated by calling payment_info_section() method.
For example, when the user selects "Bitcoin", the bitcoin message will display,
and the credit card and paypal information will be hidden.
*/
$('#payment').on('change', function() {
   payment_info_section();
});

/*
Determine which colors get displayed in the "Color" Dropdown menu
from "T-Shirt Info" section, by using the value from the parameter.
For example ...
if regExp = /JS shirt only/ then "Tomato", "Steel Blue",&
"Dim Grey" options will display.
if regExp = /JS Puns shirt only/ then "Cornflower Blue",
"Dark Slate Grey", and "Gold" options will display.
*/
function update_available_shirt_colors(regExp) {
   let $colors_list = $('select#color option');

   // if "Select Theme" was selected from dropdown menu
   if (regExp.test("select theme")) {
      for (let i = 0; i < $colors_list.length; i++) {
         // Set all options to "hidden"
         $colors_list.eq(i).attr({ hidden: true, selected: false });
      }
      return;
   }
   // if "I <3 JS" or "JS Puns" were selected from the dropdown menu
   for (let i = $colors_list.length-1; i >= 0; i--) {
      let $current_color = $colors_list.eq(i);

      // if the regular expression tested returns true, display the color
      if (regExp.test($current_color.text()) ) {
         $current_color.attr({ hidden: false, selected: true });
      } else {
         $current_color.attr({ hidden: true, selected: false });
      }
   }
}

/*
For the "Design" dropdown menu
- if the user selects "JS Puns", The "Color" dropdown menu will appear.
  The first 3 color options will show by calling the
  update_available_shirt_colors() method.
- if the user selects "I <3 JS", The "Color" dropdown menu will appear.
  The last 3 color options will show by calling the
  update_available_shirt_colors() method.
- if "Select Theme" is picked again, the "Color" dropdown menu will disappear.
*/
$('select#design').on('change', function() {

   switch ( $('#design option:selected').val() ) {
      case 'js puns':
         selected_shirt_theme = 'js puns';
         // the first 3 colors will display
         update_available_shirt_colors(/JS Puns shirt only/);
         $('#colors-js-puns').show();
         break;
      case 'heart js':
         selected_shirt_theme = 'heart js';
         // the last 3 colors will display
         update_available_shirt_colors(/JS shirt only/);
         $('#colors-js-puns').show();
         break;
      case 'Select Theme':
         selected_shirt_theme = 'Select Theme';
         // "Color" dropdown menu will disappear
         update_available_shirt_colors(/select theme/);
         $('div#colors-js-puns').hide();
         break;
      default:
         $('#colors-js-puns').show();
   }
});

let costs = 0;
/*
When a user selects or unselects an activity, the "Total" amount is reflected
at the bottom of the activities list. Conflicting activities will be crossed out.
*/
$('.activities input[type="checkbox"]').on("change", function() {
   let inputs_to_change = [];

   const $self = $(this).attr("name");
   let the_object = all_activities.find(x => x.name === $self);

   let located_object_name = the_object.name;
   console.log(located_object_name);
   let located_object_timeslot = the_object.timeslot;
   let located_object_cost = the_object.cost;
   /*
   If the names are different, but the timeslots are identical,
    the activity name will be added to the inputs_to_change array
   */
   let picked_input = all_activities.find(x => x.name !== located_object_name && x.timeslot === located_object_timeslot);
   if (picked_input) {
      inputs_to_change.push(picked_input.name);
   }

   // if the checkbox is "checked"
   if ($(this).is(':checked')) {
      costs += located_object_cost; // add to the costs
      let replacement = `Total: $${String(costs)}`;
      $('div.total_cost').text(replacement);
      $('.activities input[type="checkbox"]').each(function() {
         for (let i = 0; i < inputs_to_change.length; i++) {
            if ($(this).attr("name") === inputs_to_change[i]) {
               $(this).prop('disabled', true);
               // 'isDisabled' class is added in style.css
               $(this).parent().addClass('isDisabled');
            }
         }
      });
   }
   // if the checkbox is "unchecked"
   if (!$(this).is(':checked')) {
      costs -= located_object_cost; // substract from costs
      let replacement = `Total: $${String(costs)}`;
      $('div.total_cost').text(replacement);
      $('.activities input[type="checkbox"]').each(function() {
         for (let i = 0; i < inputs_to_change.length; i++) {
            if ($(this).attr("name") === inputs_to_change[i]) {
               $(this).prop('disabled', false);
               $(this).parent().removeClass('isDisabled');
            }
         }
      });
   }
});


/*
Analyzes user text input for proper formatting based on the regular expressions
defined in the "validations" object array.

If the format is incorrect, an error message is displayed.  If the
format is correct, the error message disappears
*/
$('input[type="text"], input[type="email"]').on("focus", function() {
   let id = $(this).attr('id');
   display_or_remove_error_message(id);

   // As the user is typing ...
   $(this).keyup(function() {
      display_or_remove_error_message(id);
   });

});

/*
   Add <span> elements:
   - To the <label> tags right before the <input> tags for "Name" and "Email".
   - To the <label> tag before $other_job_role.
   - After the <input> tags for "Card Number", "Zip Code", & "CVV".
   attach the appropriate class (error_msg_one or error_msg_two) to <span> tag.
*/
function add_the_span_elements() {
   for (let i = 0; i < validations.length; i++) {
      if (validations[i].mode === "other-title") {
         $('#other-title').prev().prev().append('<span class="error_msg_one"></span>');
      }
      else if (validations[i].mode === "credit-card-section") {
         $(`#${validations[i].id}`).after(`<span class="error_msg_two"></span>`);
      }
      else {
         $(`label[for="${validations[i].id}"]`).append('<span class="error_msg_one"></span>');
      }
   }
}

function set_initial_settings() {
   // set focus on the first text field
   $('input#name').focus();

   /* Under "Job Role" section, set the text box for other job title
   to be initially hidden */
   $('input#other-title').hide();

   /* Under "T-Shirt Info" section, set the Color dropdown menu to be
   initally hidden */
   $('div#colors-js-puns').hide();

   $('option[value="select_method"]').attr("hidden", true);
   // The "Credit Card" payment option should be selected by default.
   $('option[value="credit card"]').attr("selected", true);

   $('.activities').after('<div class="total_cost">Total: $0</div>');
   $('.activities legend').append('<span class="error_msg_one"></span>');

   $('.shirt legend').append('<span class="error_msg_one"></span>');

   payment_info_section();
}

/*
Takes in the id (such as 'mail' or 'zip') as a parameter, and uses it to
- identify the correct object from the validations obj array & retrieve the
regular expression needed to test the user text input.
- Locate the correct <input> tag from the HTML file (containing user input).
- Locate the <span> element associated with the <input> tag.
- Adds/remove the error message from the <span> tag after testing the
user input format.
*/
function display_or_remove_error_message(parameter_name) {
   let current_id = parameter_name;
   // identify the correct object
   let current_obj = validations.find(obj => obj.id === current_id);
   let $span;

   // identify the <span> tag associated with the current <input> tag
   if(current_id === "other-title") {
      $span = $(`input#${current_id}`).prev().prev().children('.error_msg_one');
   }
   else if (current_obj.mode === "credit-card-section") {
      $span = $(`input#${current_id}`).next('.error_msg_two');
   }
   else {
      $span = $(`input#${current_id}`).prev().children('.error_msg_one');
   }

   /* Does it need an error message? If it's blank or entered into the
   wrong format, yes. */
   if ( $(`input#${current_id}`).val() === "" ) {
      $span.text(current_obj.error_message);
   }

   else {
      if (current_obj.regExp.test($(`input#${current_id}`).val())) {
         $span.text("");
      } else {
         $span.text(current_obj.error_message);
      }
   }

}

/*
When the user clicks the "Register" button
*/
$('button[type="submit"]').on("click", function(e) {

   /* If the user didn't select a single activity, an error message
   will appear. */
   if (costs === 0) {
      $('.activities legend').children('span').text("You must register for at least one activity!");
   } else {
      $('.activities legend').children('span').text("");
   }

   /* If the user didn't select a T-shirt design, an error message
   will appear. */
   selected_shirt_theme = $('#design option:selected').val();
   if (selected_shirt_theme === "Select Theme") {
      $('.shirt legend').children('.error_msg_one').text("Select a Design!");
   } else {
      $('.shirt legend').children('.error_msg_one').text("");
   }

   /* The rest of the error messages will appear for any textbox that the
   user was required to fill out. */
   let inputs = ['mail', 'cc-num', 'zip', 'cvv'];
   for (let i = 0; i < inputs.length; i++) {
      display_or_remove_error_message(inputs[i]);
      e.preventDefault();
   }

   //e.preventDefault();

});


add_the_span_elements();
set_initial_settings();
