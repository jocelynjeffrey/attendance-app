// this function was provided by Udacity. See their GitHub repo at https://github.com/udacity/ud989-school-attendance
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
//end of Udacity-provided function

$(function(){
  //change back to var from window
   window.model = {
      attendanceArray: [
      {
        name : 'Erlich Bachman',
        daysMissed : 12,
        id: 'ErlichBachman'
      },
      {
        name : 'Bertram Gilfoyle',
        daysMissed : 12,
        id: 'Bertram Gilfoyle'
      },
      {
        name : 'Jared Dunn',
        daysMissed : 12,
        id: 'JaredDunn'
      },
      {
        name : 'Dinesh Chugtai',
        daysMissed : 12,
        id: 'DineshChugtai'
      },
      {
        name : 'Richard Hendriks',
        daysMissed : 12,
        id: 'RichardHendriks'
      },
      ]
    };

var octopus = {
  init: function() {
    view.init(model.attendanceArray);
    view.initChecks();
  },

  updateAttendance: function(studentId, daysAttended) {
    // get student obj by student id
    var updatedRecord = $.grep(model.attendanceArray, function(e, i) {  
      if (e.id === studentId){
        //get index of record
        model.attendanceArray[i].daysAttended = daysAttended;
        return true;
      }
    });    
    view.updateRecords(updatedRecord[0]);    
  }
};

var view = {
  init: function(data) { 
    var tbody$ = $('tbody');
    data.forEach(function(data) {
      var noSpaceName = data.name.replace(/ /g,'');
      //create row that will house student records
      tRow = $('<tr />', { class: 'student ', id: noSpaceName}).prependTo(tbody$);
      //add student name
      $('<td />', { html: data.name, 'class': 'name-col'}).prependTo(tRow);
      //add checkboxes
      var i = 0;
      for (i; i < data.daysMissed; i++) {
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
          };
      })(chckBox));
    }
  },

  countAttendance: function(recordToCheck){
    var studentName = recordToCheck[0].getAttribute('class');
    //future update: change to data attr
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

  updateRecords: function(recordToUpdate){
    var id = recordToUpdate.id;
    var missed = recordToUpdate.daysMissed;
    var daysAttended = recordToUpdate.daysAttended;

    $('#' + id).find('.missed-col').html(missed-daysAttended); 
  }
};

octopus.init();
});