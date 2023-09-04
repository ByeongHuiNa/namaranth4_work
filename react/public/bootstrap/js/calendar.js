$(function(){

//전체 일정	
	showAllCalendar();
	
	function showAllCalendar(){
		$.ajax({
			url: "/calendar/showAllCalendar",
			type: 'GET',
			dataType: 'json',
			success: function(data){
				var events = [];
				
				data.forEach(function(item) {			
					if (item.sch_allday == 1) {
					events.push({
						title : item.sch_name,
						start : moment(item.sch_start).format("YYYY-MM-DD"),
						end : moment(item.sch_end).add(1, 'days').format("YYYY-MM-DD"),
						allday : true,
						color : item.calendar.cal_color
						
					});
					} else {
						events.push({
							title : item.sch_name,
							start : moment(item.sch_start).format("YYYY-MM-DDTHH:mm:ss"),
							end : moment(item.sch_end).format("YYYY-MM-DDTHH:mm:ss"),
							allday : false,
							color : item.calendar.cal_color
						
						});
					}
				}); //forEach 
				var calendarEl = document.getElementById('calendar');
				var calendar = new FullCalendar.Calendar(calendarEl, {
					initialView : 'dayGridMonth', 
					headerToolbar : { 
						start : 'today,listWeek',
						center : 'prev title next',
						end : 'dayGridMonth,timeGridWeek,timeGridDay'
					},
					titleFormat : function(date) {
						return date.date.year + '년 '
								+ (parseInt(date.date.month) + 1) + '월';
					},
					dayCellContent : function(e) {
						e.dayNumberText = e.dayNumberText.replace('일', '');
					},
					//initialDate:  
					
					selectable : true, // 달력 일자 드래그 설정가능
					droppable : true,
					editable : true,
					nowIndicator : true, // 현재 시간 마크
					locale : 'ko', // 한국어 설정
					height : 830,
					events : events,
				}); //fullcalendar
				calendar.render();
				}
			}); //ajax
		}
	
	// 전체 캘린더 조회 버튼	
	$('#calendar-list-title').on('click', function(){			
		//console.log('click');
		showAllCalendar();								
	});
	
	
	function readSchedule(event) {
	 	
	  $('#readModal').modal('show');
	}
	
	//드롭다운
	$('#dropdown').on('change', function() {
      var selectedValue = $(this).val();
      //console.log(selectedValue); 
      $('#cal_no-input').val($(this).val());
    });
    
    //체크박스(allday)
	$('.alldayCheck').on('change', function() {
        let value = this.checked ? 1 : 0;
        
        //console.log(value);
        //console.log($('.alldayCheck').val());
        //console.log($('.alldayCheck').prop('checked') ? 1 : 0);
        
        $('#alldayInput').val(value);
        console.log($('#alldayInput').val());
    }); 
    
    //날짜 선택
	$('#datetimepicker1').on('change', function() {
        let value = $(this).val();
       
        console.log(value);
        
        //let startVal = moment(value).format("YYYY-MM-DD HH:mm:ss");
        
        //let startVal2 = new Date(startVal).toISOString();
        let startVal = Date.parse(value);
        console.log(startVal);
        //console.log(startVal2);
        
    	$('#datetimeStart').val(startVal);
    	console.log($('#datetimeStart').val());
        
        
    });
    
    $('#datetimepicker2').on('change', function() {
        let value = $(this).val();
       
        console.log(value);
        
        //let endVal = moment(value).format("YYYY-MM-DD HH:mm:ss");
        
        //let endVal2 = new Date(endVal).toISOString();
        
        let endVal = Date.parse(value);
        console.log(endVal);
        
        $('#datetimeEnd').val(endVal);
        
        
    });
    
});



// 캘린더별 일정 조회
$(function(){
	function pickCalendar(cNum){
		$.ajax({
			url: "/calendar/pickCalendar",
			type: 'GET',
			dataType: 'json',
			success: function(data){
				var events = [];
				
				data.forEach(function(item) {
					console.log(item);					
					if (cNum == item.calendar.cal_no) {
						if (item.sch_allday == 1) {
							events.push({
								title : item.sch_name,
								start : moment(item.sch_start).format("YYYY-MM-DD"),
								end : moment(item.sch_end).add(1, 'days').format("YYYY-MM-DD"),
								allday : true,
								color : item.calendar.cal_color
								
							});
						} else {
							events.push({
								title : item.sch_name,
								start : moment(item.sch_start).format("YYYY-MM-DDTHH:mm:ss"),
								end : moment(item.sch_end).format("YYYY-MM-DDTHH:mm:ss"),
								allday : false,
								color : item.calendar.cal_color
								
							});
						}
					} 
				}); //forEach 

				var calendarEl = document.getElementById('calendar');
				var calendar = new FullCalendar.Calendar(calendarEl, {
					initialView : 'dayGridMonth',  
					headerToolbar : { 
						start : 'today,listWeek',
						center : 'prev title next',
						end : 'dayGridMonth,dayGridWeek,dayGridDay'
					},
					titleFormat : function(date) {
						return date.date.year + '년 '
								+ (parseInt(date.date.month) + 1) + '월';
					},
					dayCellContent : function(e) {
						e.dayNumberText = e.dayNumberText.replace('일', '');
					},
					//initialDate:  
					selectable : true, // 달력 일자 드래그 설정가능
					droppable : true,
					editable : true,
					nowIndicator : true, // 현재 시간 마크
					locale : 'ko', // 한국어 설정
					height : 830,
					events : events

				}); //fullcalendar
				calendar.render();
				}
			}); //ajax
		}
	$('#calendar-list-table').on('click', 'tr', function(event){		
		event.stopPropagation();
		let cNum = $(this).find('input').val();
		//console.log(cNum);	
		pickCalendar(cNum);								
	});
	
});


//캘린더 등록
var addUsers = [];

$(function(){
	
	// 색상값 선택
	const inputEL = $(".color-input");
	const btnEls = $(".color-box");

  	btnEls.on("click", function() {
  		btnEls.removeClass("selected"); 
    	$(this).addClass("selected");   
  	
    	inputEL.val($(this).val());
 	});
  
  	btnEls.removeClass("selected");
  	
  	

	// 공유자 모달창
	$('#calPartiList-body').on('click', 'tr', function () {
	        $(this).toggleClass('cParti-selected');
	});
		
	    
	    $('#calParti-btn').click(function(){
	    
	    	$('#calPartiList-body').empty();
	    	$('#calPartiList-body2').empty();
	    	
	        $.ajax({
	            url: '/calendar/calPartiList',
	            type: 'get',
	            dataType: 'json',
	            success: function(data){        
	                $.each(data, function(index, item){
	                    //console.log(item);
	                    let html = '<tr>';                  
	                    html += '<td><input type="hidden" class="calListModal" value="' + item.user_no + '"></td>';
	                    html += '<td>'+ item.dept.dept_name +'</td>';
	                    html += '<td>'+ item.user_name +'</td>';
	                    html += '<td>'+ item.user_position +'</td>';
	                    html += '<td>'+ item.user_email +'</td>';
	                    html += '</tr>';
	                                            
	                    $('#calPartiList-body').append(html);
	                        
	                });
	            }
	        });
	        
	    }); 
	    

	       
	    $('#plusCal').click(function () {
	        
	    	$('#calPartiList-body tr.cParti-selected').each(function () {
	        	let userNoVal = $(this).find('.calListModal').val();
	
	            // 이미 addUsers에 존재하는지 확인 후 없으면 추가
	            if (!addUsers.includes(userNoVal)) {
	                let newRow = '<tr>';
	                newRow += '<td><input type="hidden" class="calListModal" value="' + userNoVal + '"></td>';
	                newRow += '<td>' + $(this).find('td').eq(1).text() + '</td>';
	                newRow += '<td>' + $(this).find('td').eq(2).text() + '</td>';
	                newRow += '<td>' + $(this).find('td').eq(3).text() + '</td>';
	                newRow += '<td>' + $(this).find('td').eq(4).text() + '</td>';
	                newRow += '</tr>';
	
	                $('#calPartiList-body2').append(newRow);
	
	                addUsers.push(userNoVal);
	                
	                $(this).removeClass('cParti-selected');
	            }
	        });
	    });
	    
	    $('#calPartiList-body2').on('click', 'tr', function () {
	        $(this).toggleClass('cParti-selected');
	
	        let userNoVal = $(this).find('.calListModal').val();
	        let index = addUsers.indexOf(userNoVal);
	
	        if (index !== -1) {
	            addUsers.splice(index, 1);
	        }
	    });
	
	    $('#minusCal').click(function () {
	        $('#calPartiList-body2 tr.cParti-selected').each(function () {
	            let userNoVal = $(this).find('.calListModal').val();
	            let index = addUsers.indexOf(userNoVal);
	
	            if (index !== -1) {
	                addUsers.splice(index, 1);
	            }
	
	            $(this).remove();
	        });
	    });
	    
	    $('#cPartiOk').click(function(){
	    	$('#calPartiList-body2 tr').each(function () {
	        	let userNoVal = $(this).find('.calListModal').val();
	          
	            let newRow = '<tr>';
	            newRow += '<td><input type="hidden" class="calListModal" name="calParti_no[]" value="' + userNoVal + '"></td>';
	            newRow += '<td>' + $(this).find('td').eq(1).text() + '</td>';
	            newRow += '<td>' + $(this).find('td').eq(2).text() + '</td>';
	            newRow += '<td>' + $(this).find('td').eq(3).text() + '</td>';
	            newRow += '<td>' + $(this).find('td').eq(4).text() + '</td>';
	            newRow += '</tr>';
	
	            $('#calParti-fin-table').append(newRow);
	
	        });
	        
	    }); 
	    
});


var addUsers2 = [];
//캘린더 개별 조회(수정)
$(function(){
	var cal_noUpdate;
	$('#calendar-list-table').on('click', '#cal-const-update-btn', function (event) {
		event.stopPropagation();
		
		cal_noUpdate = $(this).data("calno");
		//console.log(cal_noUpdate);
		
		$('input[name="cal_no"]').val(cal_noUpdate);
		
		getCal_no(cal_noUpdate);
		getCalParti(cal_noUpdate);
		getCalParti2(cal_noUpdate);
		
	});
	
	function getCal_no(cal_no){
		$.ajax({
	        type: "GET",
	        url: "/calendar/" + cal_no,
	        dataType: 'json',
	        success: function (data) {
	        	//console.log(data);
	           $('#offcanvasCalUpdate input[name="cal_name"]').val(data.cal_name);
	           $('#offcanvasCalUpdate input[name="cal_color"]').val(data.cal_color);
	           updateSelectedColorBox(data.cal_color);
	           
	           $('#offcanvasCalUpdate input[name="cal_con"]').val(data.cal_con);
	           
	        },
	    });
	}
	
	
	function getCalParti(cal_no){
		$('#calParti-fin-table2').empty();
		$.ajax({
	        type: "GET",
	        url: "/calendar/" + cal_no + "/userCalParti",
	        dataType: 'json',
	        success: function (data) {
	        	//console.log(data);
	        	$.each(data, function(index, item){  
	        		console.log(item.users.user_name);  
	        			        			        			        		
                    let newRow = '<tr>';                                                      
                    newRow += '<td><input type="hidden" class="calListModal" name="calParti_no[]" value="' + item.users.user_no + '"></td>';
                    newRow += '<td>'+ item.users.dept.dept_name +'</td>';
                    newRow += '<td>'+ item.users.user_name +'</td>';
                    newRow += '<td>'+ item.users.user_position +'</td>';
                    newRow += '<td>'+ item.users.user_email +'</td>';
                    newRow += '</tr>';
                                            
                    $('#calParti-fin-table2').append(newRow);
                        
                });
	        },
	        error: function (xhr, status, error) {
	            // 삭제 실패 시 오류 메시지 출력
	            //console.error(error);
	        },
	    });
	}
	
	function getCalParti2(cal_no){
		$('#calPartiList-body4').empty();
		$.ajax({
	        type: "GET",
	        url: "/calendar/" + cal_no + "/userCalParti",
	        dataType: 'json',
	        success: function (data) {
	        	//console.log(data);
	        	$.each(data, function(index, item){  
	        		console.log(item.users.user_name);  
	        			        			        			        		
                    let newRow = '<tr>';                                                      
                    newRow += '<td><input type="hidden" class="calListModal" name="calParti_no[]" value="' + item.users.user_no + '"></td>';
                    newRow += '<td>'+ item.users.dept.dept_name +'</td>';
                    newRow += '<td>'+ item.users.user_name +'</td>';
                    newRow += '<td>'+ item.users.user_position +'</td>';
                    newRow += '<td>'+ item.users.user_email +'</td>';
                    newRow += '</tr>';
                                            
                    $('#calPartiList-body4').append(newRow);
                        
                });
	        },
	        error: function (xhr, status, error) {
	            // 삭제 실패 시 오류 메시지 출력
	            //console.error(error);
	        },
	    });
	}
	
	//공유자 수정 모달창
	
	$('#calPartiList-body3').on('click', 'tr', function () {
	        $(this).toggleClass('cParti-selected');
	 });
		
	    
	    $('#calParti-btn2').click(function(){
	    
	    	$('#calPartiList-body3').empty();
	    	//$('#calPartiList-body4').empty();
	    	
	        $.ajax({
	            url: '/calendar/calPartiList',
	            type: 'get',
	            dataType: 'json',
	            success: function(data){        
	                $.each(data, function(index, item){
	                    //console.log(item);
	                    let html = '<tr>';                  
	                    html += '<td><input type="hidden" class="calListModal" value="' + item.user_no + '"></td>';
	                    html += '<td>'+ item.dept.dept_name +'</td>';
	                    html += '<td>'+ item.user_name +'</td>';
	                    html += '<td>'+ item.user_position +'</td>';
	                    html += '<td>'+ item.user_email +'</td>';
	                    html += '</tr>';
	                                            
	                    $('#calPartiList-body3').append(html);
	                        
	                });
	            }
	        });
	        
	           
	    }); 
	    

	       
	    $('#plusCal2').click(function () {
	        
	    	$('#calPartiList-body3 tr.cParti-selected').each(function () {
	        	let userNoVal = $(this).find('.calListModal').val();
	
	            // 이미 addUsers에 존재하는지 확인 후 없으면 추가
	            if (!addUsers.includes(userNoVal)) {
	                let newRow = '<tr>';
	                newRow += '<td><input type="hidden" class="calListModal" value="' + userNoVal + '"></td>';
	                newRow += '<td>' + $(this).find('td').eq(1).text() + '</td>';
	                newRow += '<td>' + $(this).find('td').eq(2).text() + '</td>';
	                newRow += '<td>' + $(this).find('td').eq(3).text() + '</td>';
	                newRow += '<td>' + $(this).find('td').eq(4).text() + '</td>';
	                newRow += '</tr>';
	
	                $('#calPartiList-body4').append(newRow);
	
	                addUsers2.push(userNoVal);
	                
	                $(this).removeClass('cParti-selected');
	            }
	        });
	    });
	    
	    $('#calPartiList-body4').on('click', 'tr', function () {
	        $(this).toggleClass('cParti-selected');
	
	        let userNoVal = $(this).find('.calListModal').val();
	        let index = addUsers2.indexOf(userNoVal);
	
	        if (index !== -1) {
	            addUsers2.splice(index, 1);
	        }
	    });
	
	    $('#minusCal2').click(function () {
	        $('#calPartiList-body4 tr.cParti-selected').each(function () {
	            let userNoVal = $(this).find('.calListModal').val();
	            let index = addUsers.indexOf(userNoVal);
	
	            if (index !== -1) {
	                addUsers2.splice(index, 1);
	            }
	
	            $(this).remove();
	        });
	    });
	    
	    $('#cPartiOk2').click(function(){
	    	$('#calParti-fin-table2').empty();
	    	$('#calPartiList-body4 tr').each(function () {
	        	let userNoVal = $(this).find('.calListModal').val();
	          
	            let newRow = '<tr>';
	            newRow += '<td><input type="hidden" class="calListModal" name="calParti_no[]" value="' + userNoVal + '"></td>';
	            newRow += '<td>' + $(this).find('td').eq(1).text() + '</td>';
	            newRow += '<td>' + $(this).find('td').eq(2).text() + '</td>';
	            newRow += '<td>' + $(this).find('td').eq(3).text() + '</td>';
	            newRow += '<td>' + $(this).find('td').eq(4).text() + '</td>';
	            newRow += '</tr>';
	
	            $('#calParti-fin-table2').append(newRow);
	
	        });
	        
	    });     
	
	    			
	function updateSelectedColorBox(colorValue) {
	  $(".color-box").removeClass("selected");
	  $(".color-box").filter(function() {
	    return $(this).val() === colorValue;
	  }).addClass("selected");
	}
});



//캘린더 삭제

$(function(){
	var cal_noDel;
	$('#calendar-list-table').on('click', '#cal-const-delete-btn', function (event) {
		event.stopPropagation();
      
      	cal_noDel = $(this).data("calno");
      	//$("#deleteModal").show();      
 	        
    });
    
//   $("#cancelDeleteBtn").on("click", function (event) {
//   	$(".modal-footer").find('[data-dismiss="modal"]').trigger("click");
//		//$("#deleteModal").hide();
//	});
	
	
	
	$("#confirmDeleteBtn").on("click", function () {
        deleteCal(cal_noDel);
    });
    
    function deleteCal(cal_no) {
        // DELETE 요청을 보내고 응답을 처리
        $.ajax({
            type: "DELETE",
            url: "/calendar/delete/" + cal_no,
            success: function (data) {
                location.reload();
            },
        });
     }
});

//일정 등록



//일정 수정

//일정 삭제



















