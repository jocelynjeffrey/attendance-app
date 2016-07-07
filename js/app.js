(function() {
  if (!localStorage.attendance) {
    console.log('Creating attendance records...');
    function getRandom() {
      return (Math.random() >= 0.5);
    }

    var nameColumns = $('tbody .name-col'),
    attendance = {};

    nameColumns.each(function() {
      var name = this.innerText;
      attendance[name] = [];

      for (var i = 0; i <= 11; i++) {
        attendance[name].push(getRandom());
      }
    });

    localStorage.attendance = JSON.stringify(attendance);
  }
}());

$(function(){
  //change back to var from window
   window.model = {
      attendanceArray: [
      {
        name : 'Slappy the Frog',
        daysMissed : 12,
        id: 'SlappytheFrog'
      },
      {
        name : 'Lilly the Lizard',
        daysMissed : 12,
        id: 'LillytheLizard'
      },
      {
        name : 'Paulrus the Walrus',
        daysMissed : 12,
        id: 'PaulrustheWalrus'
      },
      {
        name : 'Gregory the Goat',
        daysMissed : 12,
        id: 'GregorytheGoat'
      },
      {
        name : 'Adam the Alligator',
        daysMissed : 12,
        id: 'AdamtheAlligator'
      },
      ]
    };

var octopus = {
  init: function() {
    data = model.attendanceArray;
    view.init(data);
    view.initChecks();
  },

  updateAttendance: function(studentId, daysAttended) {
    // get student obj by student id
    var updatedRecord = $.grep(model.attendanceArray, function(e) {  

      if (e.id === studentId){
        //get index of record
        var recordIndex = model.attendanceArray.indexOf(e);
       return model.attendanceArray[recordIndex].daysAttended = daysAttended;
      }

    });

    view.updateRecords(updatedRecord);
  }
};

var view = {
  init: function() {
    var tbody$ = $('tbody');
    data.forEach(function(data) {

      var noSpaceName = data.name.replace(/ /g,'');
      //create row that will house student records
      tRow = $('<tr />', { class: 'student ', id: noSpaceName}).prependTo(tbody$);
      //add student name
      $('<td />', { html: data.name, 'class': 'name-col'}).prependTo(tRow);
      //add checkboxes
      var i = 0;
      for (i; i < 12; i++) {
        $('<td />', { html: '<input type="checkbox" class=' + noSpaceName + ' />', 'class': 'attend-col'}).appendTo(tRow);
      }   
      //add missed days   
      $('<td />', { html: data.daysMissed, 'class': 'missed-col'}).appendTo(tRow);
    });
  },

  initChecks: function(){
    var chckBoxArr = [];
    var cks = $(':checkbox');
    var chckBoxes = $(cks).each(function(i) {
      chckBoxArr.push( $(this) );
    });

    for (var i = 0; i < chckBoxArr.length; i++){
      chckBox = chckBoxArr[i];

      chckBox.on('click', (function(chckCopy) {              
          return function() {
            view.countAttendance(chckCopy);
            // console.log(this);
          };
      })(chckBox));
    }
  },

  countAttendance: function(recordToCheck){
    var studentName = recordToCheck[0].getAttribute('class');
    //update to data attr

    //loop through the parents to find matching record
    $('.student').each(function(){
      var this$ = $(this);
      var numOfDays;
      if ( this$.attr('id') === studentName ) {
      //loop through checkboxes to get checked
        this$.find('.attend-col :checked').each(function(i){
          //+1 to account for zero
         numOfDays = (i+1);
        });

        if (numOfDays === undefined || null){
          octopus.updateAttendance(studentName, 0);

        } else {
          octopus.updateAttendance(studentName, numOfDays);
        }
      }
    });
  },

  updateRecords: function(updatedRecord){
    var id = updatedRecord[0].id;
    var missed = updatedRecord[0].daysMissed;
    var daysAttended = updatedRecord[0].daysAttended;

    $('#' + id).find('.missed-col').html(missed-daysAttended); 

  }
};

octopus.init();
});