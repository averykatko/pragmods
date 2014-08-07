
// ---------------- 3. CONTROL FLOW ------------------
// This .js file determines the flow of the variable elements in the experiment as dictated 
// by the various calls from pragmods html.

/*
Here the images used in the experiment are loaded in two arrays.
The first is base_image_pl, which stores the "underlying" or base images
which will then be modified with props stored in the props_image_pl Array.

NOTE: Unfortunately the number of variations for each type of object is hardoded.
To make the code more usable it will be necessary to 
*/

var base_image_pl = new Array();
for (i=0; i<3; i++) {
    base_image_pl[i] = new Image();
    base_image_pl[i].src = "images2/" + base + "-base" + String(i+1) + ".png";
}


// By creating image object and setting source, the proloaded images become accesible. In this case they are stored as elements of the Array.
var props_image_pl = new Array() 
for (i=0;i<props.length;i++) {
    props_image_pl[i] = new Image();
    props_image_pl[i].src = "images2/" + base + "-" + props[i] + ".png";
}

var number_to_name = new Array();
number_to_name[0] = 'A';
number_to_name[1] = 'B';
number_to_name[2] = 'C';


// The variable that counts the number of trials done.
trials_completed = 0;
choice_sequence = ["null", "null", "null", "null", "null", "null"];

showSlide("instructions");

// The main experiment:
//		The variable/object 'experiment' has two distinct but interrelated components:
//		1) It collects the variables that will be delivered to Turk at the end of the experiment
//		2) It hall all the functions that change the visual aspect of the experiment such as showing images, etc.

var experiment = {

    // These variables are the ones that will be sent to Turk at the end.
    // The first batch, however, is set determined by the experiment conditions
    // and therefore should not be affected by the decisions made by the experimental subject.
	item: base,
	target_property: props[target_prop],
	target_frequency: target_frequencies[fam_cond],
	target_position: positions[target],    // -2
	distractor_position: positions[distractor],
	familiarization_cond: fam_cond, // This is the index number of the familiarization conditions. For example, fam_cond == 0 means that the distractors, targets etc. are: [0, 1, 2, 2, 2, 2, 2, 2, 2]
	
	item_n: [base],
	target_prop_n: [props[target_prop]],
	target_position_n: [positions[target]],
	distractor_prop_n: [props[distractor_prop]],
	distractor_position_n: [positions[distractor]],

	// These variables define the state-space of the experiment. linguistic_framing is subordinated to question_type (only matters for the first question type.)
	participant_response_type_condition: participant_response_type,
	participant_feature_count_condition: participant_feature_count,
	linguistic_framing_condition: linguistic_framing,
	target_filler_sequence_condition: target_filler_sequence,
	question_type_condition: question_type,

	// These are the variables that will be modified as a function of how the user responds to the experiment.
	// They are the ones necessary to do any science at all. 
	manip_check_target: -1,  // -1 is the default, which means that the subject did not enter any number because it was not asked to count (participant_feature_count == 1)
	manip_check_dist: -1,
	name_check_correct: "FALSE",

	// The relevant variables when the participatn response type is: Forced Choice
	choice: "null",///
	choice_correct: "null",

	// The relevant variables when the participant response type is: Betting
	// The allocated money goes to: "foil","target" and "logical" and it must sum to $100
	money_allocated_to_foil: -1,
	money_allocated_to_target: -1,
	money_allocated_to_logical: -1,


	// The relevant variables when the participant response type is: Slider/Likert scale
	Likert_value_foil: -1,
	Likert_value_target: -1,
	Likert_value_logical: -1,

	//OVERSPEC
	keyboard: -1,
	features_in_referent_to_describe: target_perm[referent_to_describe],

	// Free form text given by the participant
	about: "",
	comment: "",

	// For my first batch, I'll make it so that this represents whether familiarization was present or not... 1 is not, -1 is yes.
	//debugVariable: -1,

	familiarization_present_in_study: familiarization_status,


	// When target_filler_sequence is not 0
	choice_1: "null",
	choice_2: "null",
	choice_3: "null",
	choice_4: "null",
	choice_5: "null",
	choice_6: "null",

	choice_n: ["null","null","null"],///
	choice_correct_n: ["null","null","null"],///
	//choice_correct_n: new Array(),

	choice_correct_1: "null",
	choice_correct_2: "null",
	choice_correct_3: "null",
	choice_correct_4: "null",
	choice_correct_5: "null",
	choice_correct_6: "null",

	item_1: "null",
	item_2: "null",
	item_3: "null",
	item_4: "null",
	item_5: "null",
	item_6: "null",

	target_prop_1: "null",
	target_prop_2: "null",
	target_prop_3: "null",
	target_prop_4: "null",
	target_prop_5: "null",
	target_prop_6: "null",

	target_position_1: "null",
	target_position_2: "null",
	target_position_3: "null",
	target_position_4: "null",
	target_position_5: "null",
	target_position_6: "null",

	distractor_prop_1: "null",
	distractor_prop_2: "null",
	distractor_prop_3: "null",
	distractor_prop_4: "null",
	distractor_prop_5: "null",
	distractor_prop_6: "null",

	distractor_position_1: "null",
	distractor_position_2: "null",
	distractor_position_3: "null",
	distractor_position_4: "null",
	distractor_position_5: "null",
	distractor_position_6: "null",

	// FAMILIARIZATION DISPLAY FUNCTION
	// This 
	next_familiarization: function() {
	    // Allow experiment to start if it's a turk worker OR if it's a test run
	    // Warning, it may not be security best practices... you know why
		if (window.self == window.top | turk.workerId.length > 0) {

			// When there is a familiarization stage that sets up the priors.
			if (familiarization_status == 1) {
				// FAMILIARIZATION INSTRUCTIONS
				var familiarization_html = '<p class="block-text"">Bob really likes to ' + 
				actions[0] + ' ' + plural + '. <br>' +
				'Every ' + times[0] + ' he ' + actions[1] + ' a ' + base + '.<p>' +
				'<p class="block-text">Click on each ' + times[1].toLowerCase() + ' to see the ' + base + ' Bob ' + actions[2] + '.</p>';
				$("#familiarizationText").html(familiarization_html);

				// TIME BY TIME POPUPS FOR FAMILIARIZATION
				// Here are all the different elements that will be displayed in the familiarization task
				// most likely it will always be 9, but not necessarily
				// That is why we have a table here
				var familiarization_objects_html = '<table align="center"><tr>';

				for (i=0;i<=instances_in_familiarization-1;i++){
					familiarization_objects_html += '<td width=200px height=230px align="center" ' +
						'class="objTable"' + 
						'id="famTable' + String(i) + 
						'" onclick="experiment.reveal(' + String(i) + ')">';
					familiarization_objects_html += '<br><br><br><br>' +times[1] + ' ' + String(i+1) + ', Bob ' + actions[2] 
						+ ':<div id="day' + String(i) + '"> </div>';
					if ((i+1)%3 == 0) {
						familiarization_objects_html += "</tr><tr>";
					}
				}
				familiarization_objects_html += '</tr></table>';
				$("#famObjects").html(familiarization_objects_html);
			} else {
				experiment.target_frequency = 0;
				experiment.familiarization_cond = -1;
				// Instructions when there is no familiarization: Presenting Bob and explaning what that Bob does.
				// The importance of this slide in this condition (familiarization_status == 0) is to reiffy 
				// the social situation. In other words, make it clear that *someone* is asking you about the person.
				var familiarization_html = '<p class="block-text"">Bob really likes to ' + 
				actions[0] + ' ' + plural + '. <br>' + 
				'Every ' + times[0] + ' he ' + actions[1] + ' a ' + base + '.<p>';
				var familiarization_again_html = '<p class="block-text"">Bob also really likes to ' + 
				actions[0] + ' ' + plural + '. <br>' + 
				'Every ' + times[0] + ' he ' + actions[1] + ' a ' + base + '.<p>';
				$("#familiarizationText").html(familiarization_html);
				$("#familiarizationAgainText").html(familiarization_again_html);
			}
			if(0 === trials_completed)
			{
				showSlide("prestage");
			}
			else if(1 === permute_before_trial[trials_completed])
			{
				showSlide("prestage-again");
			}
			else
			{
				showSlide("stage");
				////...
				$("#setup").css('color','white');
				$("#labelInst").hide();
				$("#userSelectionInputFields").hide();
				$("#wrap").hide();
				$("#testNextButton").hide();
				$("#continueText").show();
				$("#continueText").html('<p class="block-text"><center>Click "Continue" for one more question about the ' + plural + ':</center></p>');
				$("#continueButton").show();
			}
		}
	},

	// MAIN DISPLAY FUNCTION
	next_test: function() {

		showSlide("stage");
		if(1 === permute_before_trial[trials_completed])
		{
			$("#setup").css('color','black');
		}
		$("#labelInst").show();
		$("#userSelectionInputFields").show();
		$("#testNextButton").show();
		$("#continueText").hide();
		$("#continueButton").hide();
		if(3 === participant_response_type)
		{
			$("#wrap").show();
		}
		else
		{
			$("#wrap").hide();
		}

		// CREATE SETUP
		var setup_html = '<p class="block-text">Take a look at these ' + plural + ' Bob has ' + actions[3] + '!</p>';
		$("#setup").html(setup_html);

		// CREATE OBJECT TABLE
		// The key thing here is that forced_choice_objects_html is something that will be *posted* on the HTML 
		// So if we make alternative objects depending on the value of *participant_response_type*
		// (tr=table row; td= table data)
		// When participant_response_type == 0
		if (participant_response_type == 0) {
			var forced_choice_objects_html = '<table align="center"><tr>';
			// Q: Is this 3 a variable thing 
			for (i=0;i<3;i++) {
				forced_choice_objects_html += '<td width=198px height=210px align="center"' + 
				' class="notChoices objTable">';
				forced_choice_objects_html += stimHTML(base,i,expt_perm[i],props,'obj');
				forced_choice_objects_html += '</td>';
			}
			forced_choice_objects_html += '</tr><tr>';
			for (i = 0; i < 3; i++) {
				forced_choice_objects_html += '<td width=198px height=20px align="center"' + 
				' class="notChoices objTable" ' +
				'id=\"tdchoice' + String(i+3) + '\">';
				forced_choice_objects_html += ' ' + number_to_name[i] + ' ';
				forced_choice_objects_html += '</td>';
			}
			forced_choice_objects_html += '</tr><tr></tr></table><br><br>';
			$("#objects").html(forced_choice_objects_html) 
		}


		// Betting Participant Input Type
		// When participant_response_type == 1
		if (participant_response_type == 1) {
			var betting_amounts_object_html = '<table align="center"><tr>';
			for (i=0;i<3;i++) {
				betting_amounts_object_html += '<td width=198px height=210px align="center"' + 
				' class="notChoices objTable" ' +
				'id=\"tdchoice' + String(i) + '\">';
				betting_amounts_object_html += stimHTML(base,i,expt_perm[i],props,'obj');
				betting_amounts_object_html += '</td>';
			}
			betting_amounts_object_html += '</tr><tr>';
			for (i = 0; i < 3; i++) {
				betting_amounts_object_html += '<td width=198px height=20px align="center"' + 
				' class="notChoices objTable" ' +
				'id=\"tdchoice' + String(i+3) + '\">';
				betting_amounts_object_html += ' ' + number_to_name[i] + ' ';
				betting_amounts_object_html += '</td>';
			}
			betting_amounts_object_html += '</tr><tr></tr></table><br><br>';
			$("#objects").html(betting_amounts_object_html);
		}

		// Likert option (fancy slider)
		// When participant_response_type == 2
		if (participant_response_type == 2) {
			var Likert_object_html = '<table align="center"><tr>';
			for (i=0;i<3;i++) {
				Likert_object_html += '<td width=198px height=210px align="center"' + 
				' class="notChoices objTable" ' +
				'id=\"tdchoice' + String(i) + '\">';
				Likert_object_html += stimHTML(base,i,expt_perm[i],props,'obj');
				Likert_object_html += '</td>';
			}
			Likert_object_html += '</tr><tr>';
			for (i = 0; i < 3; i++) {
				Likert_object_html += '<td width=198px height=30px align="center"' + 
				' class="notChoices objTable" ' +
				'id=\"tdchoice' + String(i+3) + '\">';
				Likert_object_html += ' ' + number_to_name[i] + ' ';
				Likert_object_html += '</td>';
			}
			Likert_object_html += '</tr></table><br><br>';
			$("#objects").html(Likert_object_html) 
		}

		//OVERSPEC
		if (participant_response_type == 3) {
			var betting_amounts_object_html = '<table align="center"><tr>';
			for (i=0;i<3;i++) {
				betting_amounts_object_html += '<td width=198px height=210px align="center"' + 
				' class="notChoices objTable" ' +
				'id=\"tdchoice' + String(i) + '\">';
				betting_amounts_object_html += stimHTML(base,i,expt_perm[i],props,'obj'/***, file_number_to_use_for_referents*/);
				betting_amounts_object_html += '</td>';
			}
			betting_amounts_object_html += '</tr><tr>';
			for (i = 0; i < 3; i++) {
				betting_amounts_object_html += '<td width=198px height=20px align="center"' + 
				' class="notChoices objTable" ' +
				'id=\"tdchoice' + String(i+3) + '\">';
				betting_amounts_object_html += ' ' + number_to_name[i] + ' ';
				betting_amounts_object_html += '</td>';
			}
			betting_amounts_object_html += '</tr><tr></tr></table><br><br>';
			$("#objects").html(betting_amounts_object_html);
		}		


		// CREATE MANIPULATION CHECK COMMON GROUNDING
		// Here we ask for the count of each of the features.

		if (participant_feature_count == 1) {
			var manipCheck_html = "";

			checkTarget = '<p class="block-text">How many of the ' + plural + ' have ' + 
				actual_target_prop + '?' + '  <input type="text" id="manipCheckTarget" ' + 
				'name="manipCheckTarget" size="1"></p>';
			checkDistractor = '<p class="block-text">How many of the ' + plural + ' have ' + 
				actual_distractor_prop + '?' + 
				'  <input type="text" id="manipCheckDist" ' + 
				'name="manipCheckDist" size="1"></p>';

			// randomize the order... this previously just had the lines above randomly added to manipCheck_html. This is cleaner.
			if (random(0,1) == 0) { 
				manipCheck_html += checkTarget;
				manipCheck_html += checkDistractor;
			} else {
				manipCheck_html += checkDistractor;
				manipCheck_html += checkTarget;
			} 
			$("#manipCheck").html(manipCheck_html)
		}


		// Create the way in which the question is asked (and the type of question)
		var label_html = '<br><br><p class="block-text">';
		var label_again_html = '<br><br><p class="block-text">';
		if (question_type == 0) { // LISTENER CONDITION
			if (linguistic_framing == 0) {
				label_html += 'Bob says: ';
		    	label_html += '<p class="block-text style="font-size:x-large;">' + '"My favorite ' + base + ' has <b>' + prop_words[target_prop] + '."</b></p>';
			} else if (linguistic_framing == 1) {
				label_html += 'Bob can only say one word to communicate with you and he says: ';
				label_html += '<p class="block-text style="font-size:x-large;">  <b>' + individual_prop_words[target_prop] + '</b></p>';
				label_again_html += 'Now, Bob can again say only one word to communicate with you and he says: ';
				label_again_html += '<p class="block-text style="font-size:x-large;">  <b>' + individual_prop_words[target_prop] + '</b></p>';
			}
		} else if (question_type == 1) { // SCHELLING (MUMBLE) CONDITION
			label_html += 'Bob says: '
		    label_html += '<p class="block-text style="font-size:x-large;">' + '"The ' + base + ' I most like to ' + actions[0] + ' has <b>mumblemumble."</b></p>' + '<p class="block-text style="font-size:small;">' + '(You couldn\'t hear what he said.)</p>';
		} else if (question_type == 2) { // PURE BASE RATE CONDITION
			label_html += 'Which ' + base + ' is Bob\'s favorite?</p>';
		}

		// Explain what the user is supposed to do for the pragmatic inference

		if (linguistic_framing == 0) {
			if (participant_response_type == 0) {
				label_html += '<p class="block-text">Click below on the option that represents the ' + base + ' that you think is Bob\'s favorite.</p>';
			} else if (participant_response_type == 1) {
				label_html += '<p class="block-text">You have $100 you can use to bet on the friends you think may be Bob\'s favorite. Distribute your $100 among the options by how likely you think that each of the options is Bob\'s favorite. (Make sure your bets add to $100).</p>';
			} else if (participant_response_type == 2) {
				label_html += '<p class="block-text">On a scale from 1 to 7, for each ' + base + ' choose the level of confidence that you have that it is Bob\'s favorite. Here 1 means "very confident that it is not his favorite", 7 means "very confident that it is his favorite" and 4 means that you are not sure one way or the other.</p>';
			}
		} else if (linguistic_framing == 1) {
			if (participant_response_type == 0) {
				label_html += '<p class="block-text">Click below on the option that represents the ' + base + ' that you think Bob is talking about.</p>';
				label_again_html += '<p class="block-text">Click below on the option that represents the ' + base + ' that you think Bob is talking about.</p>';
			} else if (participant_response_type == 1) {
				label_html += '<p class="block-text">You have $100 you can use to bet on the ' + base + ' you think Bob is talking about. Distribute your $100 among the options by how likely you think that Bob is referring to each of the options. (Make sure your bets add to $100).</p>';
			} else if (participant_response_type == 2) {
				label_html += '<p class="block-text">On a scale from 1 to 7, for each ' + base + ' choose the level of confidence that you have that Bob is referring to it. Here 1 means "very confident that Bob is NOT referring to it", 7 means "very confident that Bob is referring to it" and 4 means that you are not sure one way or the other.</p>';
			}
		} 
		//OVERSPEC
		else if (linguistic_framing == 13) {
			if (participant_response_type == 3) {
				label_html += '<p class="block-text">Imagine you are communicating with another Turker through a chat system. The other Turker sees the same three pictures, but in a different order. Your job is to convey to the other Turker that you are describing <b>Picture ' + number_to_name[referent_to_describe] + '</b>.<br><br>To enter your response, click on the text box below. Then, type your response by selecting letters on the virtual keyboard that will appear on the screen. When you are done typing, press <b>Accept.</b><br><br> Make sure that your description forms a complete sentence.<br><br><center>Pick the ' + base + ' with...</center></p>';
			}
		}

		if(1 === permute_before_trial[trials_completed])
		{
			$("#labelInst").html(label_html); 	
		}
		else
		{
			$("#labelInst").html(label_again_html);
		}

		// Here add the code that matters for the experiment. Note: the input fields about the pragmatic inference
		// used to be just underneath the stimuli. This got changed to force the subjects to first read the instructions
		// and only then answer the questions.
		var user_input_selection = '';
		if (participant_response_type == 0) {
			user_input_selection += '<table align="center"><tr>';
			for (i=0;i<3;i++) {
				user_input_selection += '<td width=98px height=50px align="center"' + 
					' class="unchosen objTable" ' +
					'id="tdchoice' + String(i) + '" ' +
					'onclick=\"experiment.select(' + String(i) + ')\">';
				user_input_selection +=  '<br>' + number_to_name[i];
				user_input_selection += '</td>';
			}
			user_input_selection += '</tr><tr>';
			user_input_selection += '</tr></table>';
		} else if (participant_response_type == 1) {
			user_input_selection += '<table align="center"><tr>';
			for (i = 0; i < 3; i++) {
				user_input_selection += '<td width=198px height=30px align="center"' + 
				' class="notChoices objTable" ' +
				'id=\"tdchoice' + String(i+3) + '\">';
				user_input_selection += '$<input type="text" id="betForOption' + String(i) + '" name="betForOption' + String(i) + '" size="4"> for ' + number_to_name[i];
				user_input_selection += '</td>';
			}
			user_input_selection += '</tr><tr></tr></table>';
		} else if (participant_response_type == 3) {
			user_input_selection += '<table align="center"><tr>';
			for (i = 0; i < 1; i++) {
				user_input_selection += '<td width=600px height=30px align="center"' + 
				' class="notChoices objTable" ' +
				'id=\"tdchoice' + String(i+3) + '\">';

				$('#keyboard').keyboard({
				    // *** choose layout & positioning ***
				    // choose from 'qwerty', 'alpha',
				    // 'international', 'dvorak', 'num' or 
				    // 'custom' (to use the customLayout below)
				    layout: 'qwerty',
				    customLayout: {
				        'default': [
				            'd e f a u l t',
				            '{meta1} {meta2} {accept} {cancel}'
				            ],
				        'meta1': [
				            'm y m e t a 1',
				            '{meta1} {meta2} {accept} {cancel}'
				            ],
				        'meta2': [
				            'M Y M E T A 2',
				            '{meta1} {meta2} {accept} {cancel}'
				            ]
				    },
				    // Used by jQuery UI position utility
				    position: {
				        // null = attach to input/textarea;
				        // use $(sel) to attach elsewhere
				        of: null, 
				        my: 'center top',
				        at: 'center top',
				        // used when "usePreview" is false
				        at2: 'center bottom'
				    },

				    // true: preview added above keyboard;
				    // false: original input/textarea used
				    usePreview: true,

				    // if true, the keyboard will always be visible
				    alwaysOpen: false,

					// give the preview initial focus when the keyboard
				    // becomes visible
					initialFocus : true,

				    // if true, keyboard will remain open even if
				    // the input loses focus.
				    stayOpen: false,

				    // *** change keyboard language & look ***
				    display: {
				        'meta1' : '\u2666', // Diamond
				        'meta2' : '\u2665', // Heart
				        // check mark (accept)
				        'a'     : '\u2714:Accept (Shift-Enter)',
				        'accept': 'Accept:Accept (Shift-Enter)',
				        'alt'   : 'AltGr:Alternate Graphemes',
				        // Left arrow (same as &larr;)
				        'b'     : '\u2190:Backspace',
				        'bksp'  : 'Bksp:Backspace',
				        // big X, close/cancel
				        'c'     : '\u2716:Cancel (Esc)',
				        'cancel': 'Cancel:Cancel (Esc)',
				        // clear num pad
				        'clear' : 'C:Clear',
				        'combo' : '\u00f6:Toggle Combo Keys',
				        // num pad decimal '.' (US) & ',' (EU)
				        'dec'   : '.:Decimal',
				        // down, then left arrow - enter symbol
				        'e'     : '\u21b5:Enter',
				        'enter' : 'Enter:Enter',
				        // left arrow (move caret)
				        'left'   : '\u2190',
				        'lock'  : '\u21ea Lock:Caps Lock',
				        'next'   : 'Next \u21e8',
				        'prev'   : '\u21e6 Prev',
				        // right arrow (move caret)
				        'right'  : '\u2192',
				        // thick hollow up arrow
				        's'     : '\u21e7:Shift',
				        'shift' : 'Shift:Shift',
				        // +/- sign for num pad
				        'sign'  : '\u00b1:Change Sign',
				        'space' : ' :Space',
				        // right arrow to bar
				        // \u21b9 is the true tab symbol
				        't'     : '\u21e5:Tab',
				        'tab'   : '\u21e5 Tab:Tab'
				    },

				    // Message added to the key title while hovering,
				    // if the mousewheel plugin exists
				    wheelMessage: 'Use mousewheel to see other keys',

				    css : {
				        // input & preview
				        input          : 'ui-widget-content ui-corner-all',
				        // keyboard container
				        container      : 'ui-widget-content ui-widget ui-corner-all ui-helper-clearfix', 
				        // default state
				        buttonDefault  : 'ui-state-default ui-corner-all',
				        // hovered button
				        buttonHover    : 'ui-state-hover',
				        // Action keys (e.g. Accept, Cancel, Tab, etc);
				        // this replaces "actionClass" option
				        buttonAction   : 'ui-state-active',
				        // used when disabling the decimal button {dec}
				        // when a decimal exists in the input area
				        buttonDisabled : 'ui-state-disabled'
				        },

				    // *** Useability ***
				    // Auto-accept content when clicking outside the
				    // keyboard (popup will close)
				    autoAccept: false,

				    // Prevents direct input in the preview window when true
				    lockInput: false,

				    // Prevent keys not in the displayed keyboard from being
				    // typed in
				    restrictInput: false,

				    // Check input against validate function, if valid the
				    // accept button is clickable; if invalid, the accept
				    // button is disabled.
				    acceptValid  : true,

				    // if acceptValid is true & the validate function returns
				    // a false, this option will cancel a keyboard close only
				    // after the accept button is pressed
					cancelClose  : true,

				    // tab to go to next, shift-tab for previous
				    // (default behavior)
				    tabNavigation: false,

				    // enter for next input; shift-enter accepts content &
				    // goes to next shift + "enterMod" + enter ("enterMod"
				    // is the alt as set below) will accept content and go
				    // to previous in a textarea
				    enterNavigation : false,
				    // mod key options: 'ctrlKey', 'shiftKey', 'altKey',
				    // 'metaKey' (MAC only)
				    // alt-enter to go to previous;
				    // shift-alt-enter to accept & go to previous
				    enterMod : 'altKey',

				    // if true, the next button will stop on the last
				    // keyboard input/textarea; prev button stops at first
				    // if false, the next button will wrap to target the
				    // first input/textarea; prev will go to the last
					stopAtEnd : true,

				    // Set this to append the keyboard immediately after the
				    // input/textarea it is attached to. This option works
				    // best when the input container doesn't have a set width
				    // and when the "tabNavigation" option is true
				    appendLocally: false,

				    // If false, the shift key will remain active until the
				    // next key is (mouse) clicked on; if true it will stay
				    // active until pressed again
				    stickyShift  : true,

				    // Prevent pasting content into the area
				    preventPaste: false,
				    
					// caret places at the end of any text
					caretToEnd   : false,

				    // Set the max number of characters allowed in the input,
				    // setting it to false disables this option
				    maxLength: false,

				    // Mouse repeat delay - when clicking/touching a virtual
				    // keyboard key, after this delay the key will start
				    // repeating
				    repeatDelay  : 500,

				    // Mouse repeat rate - after the repeatDelay, this is the
				    // rate (characters per second) at which the key is
				    // repeated. Added to simulate holding down a real keyboard
				    // key and having it repeat. I haven't calculated the upper
				    // limit of this rate, but it is limited to how fast the
				    // javascript can process the keys. And for me, in Firefox,
				    // it's around 20.
				    repeatRate   : 20,   

				    // resets the keyboard to the default keyset when visible
				    resetDefault : false,
				    
				    // Event (namespaced) on the input to reveal the keyboard.
				    // To disable it, just set it to ''.
				    openOn: 'focus',

				    // Event (namepaced) for when the character is added to the
				    // input (clicking on the keyboard)
				    keyBinding: 'mousedown',

				    // combos (emulate dead keys)
				    // if user inputs `a the script converts it to à,
				    // ^o becomes ô, etc.
				    useCombos: true,
				    lockInput: true,
				    // if you add a new combo, you will need to update the
				    // regex below
				    combos: {
				         // uncomment out the next line, then read the Combos
				        //Regex section below
				        // '<': { 3: '\u2665' }, // turn <3 into ♥ - change regex below
				        'a': { e: "\u00e6" }, // ae ligature
				        'A': { E: "\u00c6" },
				        'o': { e: "\u0153" }, // oe ligature
				        'O': { E: "\u0152" }
				    },

				    // *** Methods ***
				    // Callbacks - attach a function to any of these
				    // callbacks as desired
				    initialized : function(e, keyboard, el) {},
				    visible     : function(e, keyboard, el) {},
				    change      : function(e, keyboard, el) {},
				    beforeClose : function(e, keyboard, el, accepted) {},
				    accepted    : function(e, keyboard, el) {},
				    canceled    : function(e, keyboard, el) {},
				    hidden      : function(e, keyboard, el) {},

				    // called instead of base.switchInput
				    // Go to next or prev inputs
				    // goToNext = true, then go to next input;
				    //   if false go to prev
				    // isAccepted is from autoAccept option or 
				    //   true if user presses shift-enter
				    switchInput : function(keyboard, goToNext, isAccepted) {},

				    // this callback is called just before the "beforeClose"
				    // to check the value if the value is valid, return true
				    // and the keyboard will continue as it should (close if
				    // not always open, etc)
				    // if the value is not value, return false and the clear
				    // the keyboard value ( like this
				    // "keyboard.$preview.val('');" ), if desired
				    validate    : function(keyboard, value, isClosing) { return true; }

				})//keyboard obj 
				    // activate the typing extension
				.addTyping({
				    showTyping : true,
				    delay      : 50
				});

				/* Combos Regex -
				Normally you would change $.keyboard.comboRegex before initializing the keyboard because it stores the current regex, but for this demo I moved it to the bottom and thus you need to change the stored regex.

				This regex is used to match combos to combine, the first part looks for the accent/letter and the second part matches the following letter
				                                      ( first part )( 2nd )  */
				$('#keyboard').getkeyboard().regex = /([`\'~\^\"ao])([a-z])/mig;

				/* so lets say you want to do something crazy like turn "<3" into a heart. Add this to the combos '<' : { 3:"\u2665" } and add a comma to the end if needed. Then change the regex to this: /([<`\'~\^\"ao])([a-z3])/mig; 

				if you look close, all that was added was "<" to the beginning of the first part; some characters need to be escaped with a backslash in front because they mean something else in regex. The second part has a 3 added after the 'a-z', so that should cover both parts :P */

				// Typing Extension
				$('#icon').click(function() {
				    var kb = $('#keyboard').getkeyboard();
				    // typeIn( text, delay, callback );
				    kb.reveal().typeIn(simulateTyping, 500, function() {
				        // do something after text is added
				        // kb.accept();
				    });
				});//click anon function
			}//for
			//END OVERSPEC keyboard
} else if (participant_response_type == 2) {
			user_input_selection += '<br><table align="center"><tr>';
			for (i = 0; i < 3; i++) {
			user_input_selection += '<td width=198px height=30px align="center"' + 
				' class="notChoices objTable" ' +
				'id=\"tdchoice' + String(i+3) + '\">';
				user_input_selection += 'Level of confidence for ' + number_to_name[i];
				user_input_selection += '</td>';
			}
			user_input_selection += '</tr><tr>';
			for (i = 0; i < 3; i++) {
				user_input_selection += '<td width=198px height=30px align="center"' + 
				' class="notChoices objTable" ' +
				'id=\"tdchoice' + String(i+6) + '\">';
				user_input_selection += '1 <input type="radio" id="likertFor' + String(i) + '_1' + '" name="likertFor' + String(i) + '" size="1" value = "1">';
				user_input_selection += '<input type="radio" id="likertFor' + String(i) + '_2' + '" name="likertFor' + String(i) + '" size="1" value = "2">';
				user_input_selection += '<input type="radio" id="likertFor' + String(i) + '_3' + '" name="likertFor' + String(i) + '" size="1" value = "3">';
				user_input_selection += '<input type="radio" id="likertFor' + String(i) + '_4' + '" name="likertFor' + String(i) + '" size="1" value = "4">';
				user_input_selection += '<input type="radio" id="likertFor' + String(i) + '_5' + '" name="likertFor' + String(i) + '" size="1" value = "5">';
				user_input_selection += '<input type="radio" id="likertFor' + String(i) + '_6' + '" name="likertFor' + String(i) + '" size="1" value = "6">';
				user_input_selection += '<input type="radio" id="likertFor' + String(i) + '_7' + '" name="likertFor' + String(i) + '" size="1" value = "7"> 7';
				user_input_selection += '</td>';
			}
			user_input_selection += '</tr><tr></tr></table>';
		}

		$("#userSelectionInputFields").html(user_input_selection);
	},

		// SELECT FUNCTION (called in stage slide)
	select: function (c) {
		experiment.choice_n[trials_completed] = choice_names[c];///!!!!!

		// unchoose everything
		for (var i=0; i<choices.length; i++) {
		    $("#tdchoice" + String(i)).removeClass('chosen').addClass('unchosen')
		}
		// choose this one
		$("#tdchoice" + String(c)).removeClass('unchosen').addClass('chosen')

		},

		// REVEAL IMAGES IN FAMILIARIZATION
	reveal: function(n) {
			day_html = stimHTML(base,fam_dist[fam_perm[n]],fam_mat[n],props,'obj')
			$("#day" + String(n)).html(day_html) 
			fam_clicked = unique(fam_clicked.concat(n))

			if (fam_clicked.length == instances_in_familiarization) {
			    fam_finished = 1
			}
		},

	// CHECK THAT FAMILIARIZARION IS DONE
	check_fam: function() {
		if (fam_finished == 1 || familiarization_status == 0) {
		    famNextButton.blur(); 
		    experiment.next_test();
		} else {
		    $("#famMessage").html('<font color="red">' + 
				       'Please make sure you have looked at all the '+ base +  '!' + 
				       '</font>');
		}
    },
    check_fam_again: function() {
		if (fam_finished == 1 || familiarization_status == 0) {
		    famNextButton.blur(); 
		    experiment.next_test();
		} else {
		    $("#famAgainMessage").html('<font color="red">' + 
				       'Please make sure you have looked at all the '+ base +  '!' + 
				       '</font>');
		}
    },

    // CHECK THAT TEST IS DONE
    // It does not ask for the numeric input from the subject if the participant is not asked to count.
    // The condition is different depending on the type of response (input expected by the user)
    check_test: function() {

    	// This variable just takes care of the case where the subject IS asked to count the features.
    	// That is, its value is 0 when the requirements needed when the counts are needed are not in place.
    	// And 1 in all other cases. And when participant is asked to count, this also assigns
    	// the variables manip_check_target and manip_check_dist as needed.
    	var count_condition_fulfilled = 0;
    	if (participant_feature_count == 0) {
    		count_condition_fulfilled = 1;
    	} else if (document.getElementById("manipCheckTarget").value != "" && document.getElementById("manipCheckDist").value != "") {
    		count_condition_fulfilled = 1;
    		experiment.manip_check_target = document.getElementById("manipCheckTarget").value;
	    	experiment.manip_check_dist = document.getElementById("manipCheckDist").value;
    	}

    	// Checking that IF we have a forced choice type then the conditions are fulfilled
    	var forced_choice_condition_fulfilled = 0;
    	if (participant_response_type != 0 || experiment.choice_n[trials_completed] != "null") {///
    		forced_choice_condition_fulfilled = 1;
    	}

    	// Checking that IF we have a betting settup, the bets work well
    	var betting_condition_fulfilled = 0;
    	if (participant_response_type != 1) {
    		betting_condition_fulfilled = 1;
    	} else {
    		for (var i = 0; i <3; i ++) {
    			if (choice_names[i] == "foil") {
    				experiment.money_allocated_to_foil =  parseInt(document.getElementById("betForOption" + String(i)).value);
    			} else if (choice_names[i] == "target") {
    				experiment.money_allocated_to_target = parseInt(document.getElementById("betForOption" + String(i)).value);
    			} else if (choice_names[i] == "logical") {
    				experiment.money_allocated_to_logical = parseInt(document.getElementById("betForOption" + String(i)).value);
    			}
    		}
    		var sumationOverBets = experiment.money_allocated_to_foil + experiment.money_allocated_to_target + experiment.money_allocated_to_logical;
    		if (sumationOverBets == 100 &&  experiment.money_allocated_to_foil >= 0 
    			&& experiment.money_allocated_to_target >= 0 && experiment.money_allocated_to_logical >= 0 
    			&& experiment.money_allocated_to_foil <= 100 && experiment.money_allocated_to_target <= 100 
    			&& experiment.money_allocated_to_logical <= 100) {
    			betting_condition_fulfilled = 1;
    		}
    	}

    	//OVERSPEC
    	//  CHECK that participant has entered a response in the free response condition
    	var keyboard_condition_fulfilled = 0;
		if (participant_response_type != 3) {
    		keyboard_condition_fulfilled = 1;
    	} else {
    		if (document.getElementById("keyboard").value.length > 0) {
				keyboard_condition_fulfilled = 1;
    		}
    		experiment.keyboard = document.getElementById("keyboard").value;
   		}
   		//end OVERSPEC

    	// Checking that the Likert scale options work.
    	var likert_condition_fulfilled = 0;
    	if (participant_response_type != 2) {
    		likert_condition_fulfilled = 1;
    	} else {
    		for (var i = 0; i <3; i ++) {

    			var listOfLikerOptions = ["likertFor" + String(i) + "_1", "likertFor" + String(i) + "_2", "likertFor" + String(i) + "_3", "likertFor" + String(i) + "_4", "likertFor" + String(i) + "_5", "likertFor" + String(i) + "_6", "likertFor" + String(i) + "_7"];

    			if (choice_names[i] == "foil") {
    				experiment.Likert_value_foil =  parseInt(getNameRadioValue(listOfLikerOptions));
    			} else if (choice_names[i] == "target") {
    				experiment.Likert_value_target = parseInt(getNameRadioValue(listOfLikerOptions));
    			} else if (choice_names[i] == "logical") {
    				experiment.Likert_value_logical = parseInt(getNameRadioValue(listOfLikerOptions));
    			}
    		}
    		var testRadio = 1;
    		if (experiment.Likert_value_foil == 1 || experiment.Likert_value_foil == 2 || experiment.Likert_value_foil == 3 || experiment.Likert_value_foil == 4 || experiment.Likert_value_foil == 5 || experiment.Likert_value_foil == 6 ||experiment.Likert_value_foil == 7) {
    		} else {
    			testRadio = 0;
    		}
    		if (experiment.Likert_value_target == 1 || experiment.Likert_value_target == 2 || experiment.Likert_value_target == 3 || experiment.Likert_value_target == 4 || experiment.Likert_value_target == 5 || experiment.Likert_value_target == 6 ||experiment.Likert_value_target == 7) {
    		} else {
    			testRadio = 0;
    		}
    		if (experiment.Likert_value_logical == 1 || experiment.Likert_value_logical == 2 || experiment.Likert_value_logical == 3 || experiment.Likert_value_logical == 4 || experiment.Likert_value_logical == 5 || experiment.Likert_value_logical == 6 ||experiment.Likert_value_logical == 7) {
    		} else {
    			testRadio = 0;
    		}
    		if (testRadio == 1) {
    			likert_condition_fulfilled = 1;
    		}
    	}

    	if (forced_choice_condition_fulfilled == 1 && betting_condition_fulfilled == 1 && likert_condition_fulfilled == 1 && count_condition_fulfilled == 1 && keyboard_condition_fulfilled == 1) {
    		// Here you repeat the experiment if the trial number is not done.
    		trials_completed = trials_completed + 1;
    		if (trials_completed < num_trials) {//used to be hard-coded as 6
				stim_index = ordered_stimuli[trials_completed]; ///LOOK AT THIS CODE

				if(1 === permute_before_trial[trials_completed]) {///
					permute();
				}
				target_unpermuted = target_unpermuted_for_trial[trials_completed];
				distractor_unpermuted = distractor_unpermuted_for_trial[trials_completed];
				target_prop_unpermuted = target_prop_unpermuted_for_trial[trials_completed];
				distractor_prop_unpermuted = distractor_unpermuted_for_trial[trials_completed];

				/*experiment.item_n.push(base);
				experiment.target_prop_n.push(props[target_prop]);
				//experiment.target_position_n.push();
				experiment.distractor_prop_n.push(props[distractor_prop]);
				//experiment.distractor_position_n.push();*/

				get_next_trial_data();

				experiment.item_n.push(base);
				experiment.target_prop_n.push(props[target_prop]);
				experiment.target_position_n.push(positions[target]);////
				experiment.distractor_prop_n.push(props[distractor_prop]);
				experiment.distractor_position_n.push(positions[distractor]);

				testNextButton.blur(); 
				experiment.next_familiarization();
    		} else {
				testNextButton.blur(); 
				showSlide("check");
    		}
    		/*experiment.item_n.push(base);
			experiment.target_prop_n.push(props[target_prop]);
			//experiment.target_position_n.push();
			experiment.distractor_prop_n.push(props[distractor_prop]);
			//experiment.distractor_position_n.push();*/
		} else {
	    	$("#testMessage").html('<font color="red">' + 
			'Please make sure you have answered all the questions!' + 
			'</font>');
			if (betting_condition_fulfilled == 0){
				$("#testMessage").html('<font color="red">' + 
				'Please make sure that all your bets add to $100 and that you have given a value to each option' + 
				'</font>');
			}
			if (likert_condition_fulfilled == 0) {
				$("#testMessage").html('<font color="red">' + 
				'Please make sure you have given an answer to each option!' + 
				'</font>');
			}
			if (keyboard_condition_fulfilled == 0) {
				$("#testMessage").html('<font color="red">' +
				'Please enter a response!' +
				'</font>');
			}
		}
    },

   // FINISHED BUTTON CHECKS EVERYTHING AND THEN ENDS
    check_finished: function() {
    	var listOfNameRadios = ["namecheck1", "namecheck2", "namecheck3", "namecheck4"];
    	personMet = getNameRadioValue(listOfNameRadios);
		if (personMet == 0 ||
		    document.getElementById('about').value.length < 1) {
		    $("#checkMessage").html('<font color="red">' + 
				       'Please make sure you have answered all the questions!' + 
				       '</font>');
		} else {
		    if (personMet == 1) {
				experiment.name_check_correct = "TRUE";
		    }
		    experiment.about = document.getElementById("about").value;
		    experiment.comment = document.getElementById("comments").value;
		    showSlide("finished");

		    // HERE you can performe the needed boolean logic to properly account for the target_filler_sequence possibilities.
		    // In other words, here you can check whether the choice is correct depending on the nature of the trial.

		    /*if (experiment.choice_n[trials_completed] == "target") {///
				experiment.choice_correct_n[trials_completed] = "TRUE";///
		    } else {
		    	experiment.choice_correct_n[trials_completed] = "FALSE";///
		    }*/
		    experiment.end();
		}
    },

    // END FUNCTION 
    end: function () {
    	showSlide("finished");

    	if(0 === sequence_condition)//1w,0w,1b
    	{
    		experiment.choice_1 = "keyboard";
    		experiment.choice_2 = experiment.choice_n[1];
    		experiment.sequence_condition = "kb1b";
    	}
    	else//0w,1w,1b
    	{
    		switch(experiment.choice_n[0])
    		{
    			case "target": experiment.choice_1 = "logical"; break;
    			case "logical": experiment.choice_1 = "target"; break;
    			case "foil": experiment.choice_1 = "foil"; break;
    			default: experiment.choice_1 = "error"; break;
    		}
    		experiment.choice_2 = experiment.choice_n[1];
    		experiment.choice_3 = experiment.choice_n[2];
    		experiment.sequence_condition = "0w1w1b";
    	}

    	experiment.choice_correct_1 = "null";
    	experiment.choice_correct_2 = ("target" == experiment.choice_2);
    	experiment.choice_correct_3 = "null";

    	experiment.item_1 = experiment.item_n[0];
    	experiment.item_2 = experiment.item_n[1];
    	//experiment.item_3 = experiment.item_n[2];

    	experiment.target_prop_1 = experiment.target_prop_n[0];
    	experiment.target_prop_2 = experiment.target_prop_n[1];
    	//experiment.target_prop_3 = experiment.target_prop_n[2];

    	experiment.target_position_1 = experiment.target_position_n[0];
    	experiment.target_position_2 = experiment.target_position_n[1];
    	//experiment.target_position_3 = experiment.target_position_n[2];

    	experiment.distractor_prop_1 = experiment.distractor_prop_n[0];
    	experiment.distractor_prop_2 = experiment.distractor_prop_n[1];
    	//experiment.distractor_prop_3 = experiment.distractor_prop_n[2];

    	experiment.distractor_position_1 = experiment.distractor_position_n[0];
    	experiment.distractor_position_2 = experiment.distractor_position_n[1];
    	//experiment.distractor_position_3 = experiment.distractor_position_n[2];

    	setTimeout(function () {
		turk.submit(experiment);
        }, 500); 
    }
}