/*
 * local 에서 올린 파일 JSON으로 변환
 */
function parseCsv(params) {
	loadingStart("contents");
	Papa.parse(params.file, {
		header: true,
		dynamicTyping: true,
		encoding: "euc-kr",
		complete: function(results) {
			fn_makeGrid({
				data: results.data,
				table: params.table,
				tRow: params.tRow
			}).then(function(deferred) {
				alert('파일등록이 ' + deferred + " 했습니다.");
				loadingStop("contents");
			});
		}
	});
}

function parseCsv2(params) {
	loadingStart("contents");
	Papa.parse('/cmm/cmm/fileDownload.do?atchFileId=FILE_000000001568678&fileDetailSn=1', {
		download: true,
		header: true,
//		dynamicTyping: true,
//		encoding: "EUC_KR",
		complete: function(results) {

//			fn_makeGrid({
//				data: results.data,
//				table: params.table,
//				tRow: params.tRow
//			});
			loadingStop("contents");
		}
	});
}


var gridTable;
function fn_makeGrid(params){
	var deferred = $.Deferred();
	var data = params.data;
	var tableNm = params.table;
	var tRow = params.tRow;
	var fields = params.data[0];
	$('#' + params.table + '> tbody').empty();
	$('#' + params.table + '> thead > tr').empty();
	
	
	$('#standard-01').empty();
	$('#standard-02').empty();
	
	
	var header = new Array();
	var rdata = new Array();
	
	/*
	 _.mapObject(fields, function (val,key) {
		$('#' + tableNm + ' thead tr').append($('<th class="thCls">').html(key));
		header.push(key);
	});
	*/
	
	var columnData = new Array();
	_.mapObject(fields, function (val,key) {
		
		var ojbect = 
		 	{	header: key, 
				title: key, 
				name : key, 
				whiteSpace:'nowrap',
				ellipsis : true, 
				width : 125,
				
				// 편집 필요시.. 시각화는 풀어줘야 함
				editor : 'text'
			};
	 	
		columnData.push(ojbect);
	});
	
	/*
	var strTbody = '';
	for(var i = 0; i < data.length; i ++){
		var d = data[i];
		var gridData = new Object();
		strTbody += '<tr class="trCls"> \n';
		 _.mapObject(d, function (val,key) {
			 strTbody += '\t <td class="tdCls" style = "text-align : center; border:2px solid #d4cccc; text-overflow:ellipsis; overflow:hidden; white-space:nowrap;"><!= ' + key + ' !></td> \n';
			 gridData[key] =  val;
		 });	
		rdata.push(gridData);
		strTbody += '</tr>'
		$('#'+ tRow)[0].text = strTbody
		$('table #' + tableNm + ' thead tr');
	}
	
	$('#' + tableNm + ' thead tr th').css('width', '150px');
	$('#' + tableNm + ' thead tr th').css('border', '2px solid #d4cccc');
	try {
		gridTable = jui.ready([ "grid.table" ], function(table) {
			   gridtable = table("#" + tableNm + "", {
		        fields: header,
		        data: rdata,
		        editRow: header,
		        resize: true,
		        sort: true,
		        editEvent : true,
		        event: {
		        },
		        tpl: {
		        	 row: $("#" + tRow).html()
		        }
		    });
		});
		deferred.resolve('성공');
	} catch (err) {
		deferred.resolve('실패');
	}
	*/
	params.data.splice(params.data.length-1);
	
	try {
		 dataTable = new tui.Grid({
			 el : document.getElementById('gridtable'),
			 width: 125 * columnData.length,
			 minBodyHeight : 40,
			 data: params.data,
			 scrollX: false,
			 scrollY: false,
			 columns: columnData
	 });
	 
	 deferred.resolve('성공');
	
	 } catch(err) {
		deferred.resolve('실패');
	 }
	
	return deferred;
}

/**
* 파싱된 데이터 차트에 표출
*/
function fn_makeChart(data){
	$('#chart-area').empty();
	
	var container = document.getElementById('chart-area');
	var categories = [];
	var series = {};
	var breadth = $("#standard-01").val()
	var length = $("#standard-02").val()
	var rdata = new Array();
	var rowCount =  $('input[name="sort-offer"]:checked').val();
	if(rowCount != "all") {
		for(var i=0; i<data.length; i++) {
			data[i].data = data[i].data.slice(0,parseInt(rowCount));
		}
	}
	
	for(var i=0; i<data.length; i++){
		if(data[i].name == breadth){
			categories.push(data[i].data);
		}
		if(data[i].name == length){			
			series["name"] = data[i].name;
			series["data"] = data[i].data;
		}
	}
	
	var data = {
	    categories: categories[0],
	    series: [series]
	};
	var options = {
	    chart: {
	        width: 700,
	        height: 550,
	        format: '1,000'
	    },
	     series: {
	         showLabel: true
	    },
	    chartExportMenu : {
	    	visible : false
	    }
	};
	var theme = {
	    series: {
	        colors: [
	            '#83b14e', '#458a3f', '#295ba0', '#2a4175', '#289399',
	            '#289399', '#617178', '#8a9a9a', '#516f7d', '#dddddd'
	        ]
	    }
	};
	
	if($(".chart-type-choice").children("[class*='on']").length<1 == true){
		alert("차트 유형을 선택해 주십시오.");
	}else if($(".chart-type-choice").children().hasClass("type bar on")){
		tui.chart.barChart(container, data, options);
	}else if($(".chart-type-choice").children().hasClass("type column on")){
		tui.chart.columnChart(container, data, options);
	}else if($(".chart-type-choice").children().hasClass("type line on")){
		tui.chart.lineChart(container, data, options);
	}else if($(".chart-type-choice").children().hasClass("type area on")){
		tui.chart.areaChart(container, data, options);
	}else if($(".chart-type-choice").children().hasClass("type pie on")){
		tui.chart.pieChart(container, data, options);
	}else if($(".chart-type-choice").children().hasClass("type radial on")){
		tui.chart.radialChart(container, data, options);
	}else if($(".chart-type-choice").children().hasClass("type radial on")){
		tui.chart.radialChart(container, data, options);
	}	
}

function fn_insert() {
   	$.ajax({
		url	 	 : "/tcs/vas/insertVisualization.json",
		data 	 : $("#visualizationVO").serialize(),
		dataType : "json",
		type	 : 'POST',
		success	 : function(result){
			
			if(!result.loginAt){
				if(confirm("로그인이 필요한 서비스입니다. 로그인 화면으로 이동하시겠습니까?")){
				    $("#VisualizationVO").attr("onSubmit","");
				    $("#VisualizationVO").attr("action", "<c:url value='/uim/login/loginView.do'/>").submit();
				}else{
					return;
				}
			}
			
			uploadThumbnailAndCsv(result.thumbnailAtchFileId, result.orgAtchFileId);
		},
		error: function(xhr, status, error) {
			alert("<spring:message code='cmm.fail.save.msg' />");
		}	
	});
}

function uploadThumbnailAndCsv(thumbnailAtchFileId, orgFileId) {
	window.scrollTo(0, 0);
	
	content = $("#chart-area");
	
	var useWidth = content.prop("scrollWidth");
	var useHeight = content.prop("scrollHeight");
	
	html2canvas(document.getElementById('chart-area'), {width: useWidth, height: useHeight}).then(function (canvas) {
		var ctx = canvas.getContext("2d");
		var img = new Image();
		img.width = 700;
		img.height = 550;
	   	var imgDataUrl = canvas.toDataURL("image/png");
	   	var blobBin = atob(imgDataUrl.split(',')[1]);	// base64 데이터 디코딩
	    var array = [];
	    for (var i = 0; i < blobBin.length; i++) {
	        array.push(blobBin.charCodeAt(i));
	    }
	    var thumbFile = new Blob([new Uint8Array(array)], {type: 'image/png'});	// Blob 생성
		var jsonObj = fn_tableToJson();
		var csvFile = new Blob(["\ufeff"+ decodeURIComponent(Papa.unparse(jsonObj))], {type: 'text/csv;charset=utf-8'});
	    var formdata = new FormData();	// formData 생성
		formdata.append("atchFileId", thumbnailAtchFileId);
		formdata.append("storeDetailPath", "vas");
		formdata.append("atchFileTyCode", "DATD03");
	    formdata.append("qqfile", thumbFile);	// file data 추가
		formdata.append("atchFileId2", orgFileId);
		formdata.append("qqfile2", csvFile);
	    
		$.ajax({
			url			: "/cmm/cmm/uploadFile.do",
			data : formdata,
	        processData : false,
	        contentType : false,	
			type		: 'POST',
			success		: function(result){
				document.location.href = '/tcs/vas/selectVisualizationListView.do';
			},
			error: function(xhr, status, error) {
				alert("<spring:message code='cmm.fail.save.msg' />");
			}	
		});
   	});
}

/**
 * 상세 데이터 보기
 * @param csvFileId
 * @returns
 */
function filePreview(csvFileId) {
	Papa.parse('/cmm/cmm/fileDownload.do?atchFileId='+csvFileId+'&fileDetailSn=1', {
		download: true,
		header: true,
		complete: function(results) {
			var data = results.data;
			var fields = data[0];
			 _.mapObject(fields, function (val,key) {
				$('#previewCsv thead tr').append($('<th>').html(key));
			});

		 	for(var i = 0; i < data.length-1; i ++) {
		 		var strTbody = '';
				var d = data[i];
				 _.mapObject(d, function (val,key) {
					 strTbody += '<td>' + val + '</td>';
				 });	
				$('#previewCsv tbody').append($('<tr>').html(strTbody));
			}
		}
	});
}

/**
 * 차트 이미지 다운로드
 * @returns
 */
function chartImgDown(thumbFileId, fileDataNm) {
	var url = '/cmm/cmm/fileDownload.do?atchFileId=' + thumbFileId + '&fileDetailSn=1';

	// HEAD 요청으로 파일 존재 여부 먼저 확인
	fetch(url, { method: 'HEAD' })
		.then(function(response) {
			var contentLength = parseInt(response.headers.get('Content-Length') || '0');

			// Content-Length = 0 → 소실 파일
			if (contentLength === 0) {
				alert('죄송합니다. 선택하신 파일은 복구 진행 중인 파일로 현재는 제공될 수 없습니다.');
				return;
			}

			// 파일 존재 → GET 요청
			var xhr = new XMLHttpRequest();
			xhr.open('GET', url, true);
			xhr.responseType = 'blob';
			xhr.onload = function(e) {
				const contentType = xhr.getResponseHeader("Content-Type");

				if (contentType && contentType.indexOf("text/html") !== -1) {
					const reader = new FileReader();
					reader.onload = function() {
						alert('죄송합니다. 선택하신 파일은 복구 진행 중인 파일로 현재는 제공될 수 없습니다.');
					};
					reader.readAsText(xhr.response);
					return;
				}

				var blob = new Blob([xhr.response], {type: 'image/png'});
				var a = document.getElementById('chartImgDown');
				var blobUrl = window.URL.createObjectURL(blob);
				a.href = blobUrl;

				//브라우저 체크
				var agent = navigator.userAgent.toLowerCase();
				if ((navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
					window.navigator.msSaveBlob(blob, fileDataNm + '.png');
				} else {
					a.download = fileDataNm + '.png';
					a.click();
				}
			}
			xhr.send();
		})
		.catch(function(error) {
			console.error('파일 다운로드 오류:', error);
			alert('파일 다운로드 중 오류가 발생했습니다.');
		});
}


/**
 * 원본 데이터 다운로드
 * @returns
 */
function orgDataFileDown(csvFileId, fileDataNm) {
	var url = '/cmm/cmm/fileDownload.do?atchFileId=' + csvFileId + '&fileDetailSn=1';

	// HEAD 요청으로 파일 존재 여부 먼저 확인
	fetch(url, { method: 'HEAD' })
		.then(function(response) {
			var contentLength = parseInt(response.headers.get('Content-Length') || '0');

			// Content-Length = 0 → 소실 파일
			if (contentLength === 0) {
				alert('죄송합니다. 선택하신 파일은 복구 진행 중인 파일로 현재는 제공될 수 없습니다.');
				return;
			}

			// 파일 존재 → GET 요청
			var xhr = new XMLHttpRequest();
			xhr.open('GET', url, true);
			xhr.responseType = 'blob';
			xhr.onload = function(e) {
				const contentType = xhr.getResponseHeader("Content-Type");

				if (contentType && contentType.indexOf("text/html") !== -1) {
					const reader = new FileReader();
					reader.onload = function() {
						alert('죄송합니다. 선택하신 파일은 복구 진행 중인 파일로 현재는 제공될 수 없습니다.');
					};
					reader.readAsText(xhr.response);
					return;
				}

				var blob = new Blob([xhr.response], {type: 'text/csv'});
				var a = document.getElementById('orgDataFileDown');
				var blobUrl = window.URL.createObjectURL(blob);
				a.href = blobUrl;

				//브라우저 체크
				var agent = navigator.userAgent.toLowerCase();
				if ((navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
					window.navigator.msSaveBlob(blob, fileDataNm + '.csv');
				} else {
					a.download = fileDataNm + '.csv';
					a.click();
				}
			}
			xhr.send();
		})
		.catch(function(error) {
			console.error('파일 다운로드 오류:', error);
			alert('파일 다운로드 중 오류가 발생했습니다.');
		});
}

/**
 * 공공데이터 팝업에서 검색
 * @returns
 */
function searchPubDataList(keyword) {
	
	var data = {
		"keyword" : keyword	
	};
	$.ajax({
		url			: "/tcs/vas/selectKeywordSearch.do",
		data : data ,
		type		: 'POST',
		success		: function(result){
			cosole.log(result);
		}
	});
}

/*
 * 트리형 차트 생성 함수
 */
var fn_makeTreeMapChart = function(tableRow, container, contactIndex) {
	var alljsonData = [];
	
	// 행들을 읽어서 오브젝트로 만들어 하나의 배열에 넣는 작업.
	for (var i = 0; i < tableRow.length; i++) {
		var innerJson	= {};
		
		for (var j = 0; j < contactIndex.length; j++) {
			var tempData = tableRow[i][contactIndex[j]];
			
			if (j === 0) {
				innerJson["label"] = tempData;
				
			} else if (j === 1) {
				
				if (tempData === "" || tempData === "undefined" || tempData === "null") {
					innerJson["children"] = [];
				} else {
					innerJson["value"] = parseFloat(tempData);
				}
				
			} else if (j === 2) {
				innerJson["parent"] = tempData;
			
			}
		}
		
		alljsonData[alljsonData.length] = innerJson;
	}
	
	// 한줄에 저장되어 있는 모든 오브젝트들을 계층형으로 만들어 주는 로직. 자식오브젝트가 부모 오브젝트에 들어갈 수 있도록 작업.
	for (var i = 0; i < alljsonData.length; i++) {
		var tempObj = alljsonData[i];
		
		for (var j = 0; j < alljsonData.length; j++) {
			var tempObj2 = alljsonData[j];
			
			if (tempObj["parent"] === tempObj2["label"]) {
				tempObj2["children"].push(tempObj);
				
				break;
			}
		}
	}
	
	// 최상위 오브젝트들만 추출하는 로직
	var upperArr = [];
	
	for (var i = 0; i < alljsonData.length; i++) {
		var tempObj = alljsonData[i];
		
		if (tempObj["parent"] === "") {
			upperArr[upperArr.length] = tempObj;
		}
	}
	
	// 불필요 필드 지우는 재귀함수 함수
	var fn_deleteParentField = function(obj) {
		
		if (obj["value"] === undefined && typeof obj["children"] === "object") {
			
			for (var j = 0; j < obj["children"].length; j++) {
				fn_deleteParentField(obj["children"][j]);
			}
		} 
			
		delete obj["parent"];
	}
	
	// 해당 데이터에 불필요 필드(parent)를 지우는 재귀함수 호출 부.
	for (var i = 0; i < upperArr.length; i++) {
		fn_deleteParentField(upperArr[i]);
	}
	
	var data = {
		"series"	: 	upperArr
	};
	
	var options = {
	    chart: {
	        width: 725,
	        height: 500,
	    },
	    series: {
	        showLabel: true,
	        zoomable: false,
	        useLeafLabel: true
	    }
	};
	
	tui.chart.treemapChart(container, data, options);
} 

/*
 * 히트맵형 차트 생성 함수
 */
var fn_makeHeatMapChart = function(tableRow, container, contactIndex) {

	// 데이터 가공시 필요한 변수 생성
	var categories = {};
	var series = [];
	var xArray = [];
	var yArray = [];

	var xSet = new Set();
	var ySet = new Set();
	for(var i = 1; i< tableRow.length; i++) {
		xSet.add(tableRow[i][1]);
		ySet.add(tableRow[i][0]);
	}

	xSet.forEach( setValue => {
		xArray.push(setValue);
	});

	ySet.forEach( setValue => {
		yArray.push(setValue);
	});

	categories["x"] = xArray;
	categories["y"] = yArray;

	for(var i = 1; i < tableRow.length; i+=xArray.length) {
		var tempArr = [];
		for(var j = i; j < i + xArray.length;j++) {
			tempArr.push(tableRow[j][2]);
		}
		series.push(tempArr);
	}

	// 최종 차트가 요구하는 데이터(resultData 객체) 생성
	var resultData = {
		"categories" : categories,
		"series" : series
	}

	var options = {
	    chart: {
	        width: 725,
	        height: 650,
	    },
	    series: {
	        showLabel: true
	    }
	};
	
	tui.chart.heatmapChart(container, resultData, options);
}


/*
 * 박스플롯형 차트 생성 함수
 */
var fn_makeBoxPlotChart = function(tableRow, container, contactIndex) {

	// 데이터 가공시 필요한 변수 생성
	var categories = [];
	var categorySet = new Set();
	var nameSet = new Set();
	var series = [];
	var map = new CustomMap();
	var outliers = [];

	for(var i = 1; i< tableRow.length; i++) {
		categorySet.add(tableRow[i][0]);
	}
	categorySet.forEach( setValue => {
		categories.push(setValue);
	});

	for(var i = 1; i< tableRow.length; i++) {
		nameSet.add(tableRow[i][1]);
	}

	var templateDataList = [];
	var template = {
		"name": "",
		"data" : []
		// "outliers": []
	};

	nameSet.forEach( setValue => {
		var outlierIndex = 0;

		template = {
			"name": setValue,
			"data" : []
			// "outliers": []
		};

		var tempMap = new CustomMap();
		
		templateDataList = [];
		//2 data insert
		for(var i = 1; i < tableRow.length; i++) {

			// data setting
			if(setValue == tableRow[i][1]) {
				templateDataList.push(tableRow[i][2]);
			} else if(setValue != tableRow[i][1] && templateDataList.length != 0) {
				template.data.push(templateDataList);
				templateDataList = [];
			}
		}

		series.push(template)
	});

	// 마지막 temp데이터 push
	template.data.push(templateDataList);

	// 최종 차트가 요구하는 데이터(resultData 객체) 생성
	var resultData = {
		"categories" : categories,
		"series" : series
	}
	
	var options = {
	    chart: {
	        width: 725,
	        height: 650,
	        format: '1,000'
	    },
	    legend: {
	        align: 'bottom'
	    }
	};

	tui.chart.boxplotChart(container, resultData, options);
}

/*
 * 불릿형 차트 생성 함수
 */
var fn_makeBulletChart = function(tableRow, container, contactIndex) {
	var categories = [];
	var series = [];

	for(var i = 1; i < tableRow.length; i++) {
		categories.push(tableRow[i][0]);
	}

	for (var i = 1; i < tableRow.length; i++) {
		var jsonObj = {};

		for (var j = 0; j < tableRow[0].length; j++) {
			jsonObj["name"] = tableRow[i][0];
			jsonObj["data"] = tableRow[i][1];
			jsonObj["markers"] = JSON.parse(tableRow[i][2]);
			jsonObj["ranges"] = JSON.parse(tableRow[i][3]);
		}

		series.push(jsonObj);
	}

	// 최종 차트가 요구하는 데이터(resultData 객체) 생성
	var resultData = {
		"categories" : categories,
		"series" : series
	}

	var options = {
	    chart: {
	        width: 725,
	        height: 650,
	        format: '1,000'
	    },
	    series: {
	        showLabel: true,
	        vertical: false
	    }
	};
	
	var theme = {
	    series: {
	        ranges: [{ color: 'gray', opacity: 0.7 },
	            null,
	            { color: 'purple' }
	        ]
	    }
	};

	tui.chart.registerTheme('myTheme', theme);
	options.theme = 'myTheme';

	tui.chart.bulletChart(container, resultData, options);
}


/*
 * 파이형 차트 생성 함수
 */
var fn_makePieChart = function(tableRow, container, contactIndex) {

	// 데이터 가공시 필요한 변수 생성
	// category의 경우 한가지만 설정할 수 있음.
	// nestedPie chart가 아니기 때문
	var categories = [];
	categories.push(tableRow[1][0]);
	var series = [];

	for(var i = 1; i < tableRow.length; i++) {
		series.push({
			"name": tableRow[i][1],
			"data": tableRow[i][2]
		});
	}

	// 최종 차트가 요구하는 데이터(resultData 객체) 생성
	var resultData = {
		"categories" : categories,
		"series" : series
	}

	var options = {
		chart: {
			width: 725,
			height: 650
		}
	};

	tui.chart.pieChart(container, resultData, options);
}

/*
 * 지도형 차트 생성 함수
 */
var fn_makeMapChart = function(tableRow, container, contactIndex) {

	var data	= {};
	var series	= [];
	
	for (var i = 1; i < tableRow.length; i++) {
		var jsonObj = {};
		
		for (var j = 0; j < tableRow[0].length; j++) {
			var tempData = tableRow[i][j];
			
			if (j === 0) {
				var nation = tempData;
				var code = "";
				
				if (nation.indexOf("서울") > -1) {
					code = "KR-SU";
				} else if (nation.indexOf("부산") > -1) {
					code = "KR-BS";
				} else if (nation.indexOf("대구") > -1) {
					code = "KR-DG";
				} else if (nation.indexOf("인천") > -1) {
					code = "KR-IC";
				} else if (nation.indexOf("광주") > -1) {
					code = "KR-GJ";
				} else if (nation.indexOf("대전") > -1) {
					code = "KR-DJ";
				} else if (nation.indexOf("울산") > -1) {
					code = "KR-US";
				} else if (nation.indexOf("경기") > -1) {
					code = "KR-GG";
				} else if (nation.indexOf("강원") > -1) {
					code = "KR-GW";
				} else if (nation.indexOf("충북") > -1 || nation.indexOf("충청북도") > -1 || nation.indexOf("충청 북도") > -1) {
					code = "KR-NC";
				} else if (nation.indexOf("충남") > -1 || nation.indexOf("충청남도") > -1 || nation.indexOf("충청 남도") > -1) {
					code = "KR-SC";
				} else if (nation.indexOf("전북") > -1 || nation.indexOf("전라북도") > -1 || nation.indexOf("전라 북도") > -1) {
					code = "KR-NJ";
				} else if (nation.indexOf("전남") > -1 || nation.indexOf("전라남도") > -1 || nation.indexOf("전라 남도") > -1) {
					code = "KR-SJ";
				} else if (nation.indexOf("경북") > -1 || nation.indexOf("경상북도") > -1 || nation.indexOf("경상 북도") > -1) {
					code = "KR-NG";
				} else if (nation.indexOf("경남") > -1 || nation.indexOf("경상남도") > -1 || nation.indexOf("경상 남도") > -1) {
					code = "KR-SG";
				} else if (nation.indexOf("제주") > -1) {
					code = "KR-JJ";
				} else if (nation.indexOf("세종") > -1) {
					code = "KR-SE";
				}
				
				jsonObj["code"] = code;
			} else {
				jsonObj["data"] = tempData;
			}
		}
		
		series[series.length] = jsonObj;
	}
	
	data["series"] = series;
	
	var options = {
	    chart: {
	        width : 725,
	        height : 650
	    },
	    map: 'south-korea',
	    legend: {
	        align: 'right'
	    }
	};
	
	tui.chart.mapChart(container, data, options);
}

/*
 * 분산형 차트 생성 함수
 */
var fn_makeScatterChart = function(tableRow, container, contactIndex) {

	// 데이터 가공시 필요한 변수 생성
	var series		= [];
	var nameSet = new Set();

	for(var i = 1; i< tableRow.length; i++) {
		nameSet.add(tableRow[i][0]);
	}

	nameSet.forEach( nameSetValue => {
		var data = [];
		for(var k = 1; k < tableRow.length; k++) {
			if(nameSetValue == tableRow[k][0]) {
				data.push({
					"x": tableRow[k][1],
					"y": tableRow[k][2]
				});
			}
		}
		series.push({
			"name": nameSetValue,
			"data": data
		});
	});

	// 최종 차트가 요구하는 데이터(resultData 객체) 생성
	var resultData = {
		"series" : series
	}

	var options = {
	    chart: {
	        width : 725,
	        height: 650
	    }
	};

	tui.chart.scatterChart(container, resultData, options);
}

/*
 * 버블 차트 생성 함수
 */
var fn_makeBubbleChart = function(tableRow, container, contactIndex) {

	// 데이터 가공시 필요한 변수 생성
	var series = [];
	var nameSet = new Set();

	for(var i = 1; i< tableRow.length; i++) {
		nameSet.add(tableRow[i][0]);
	}

	nameSet.forEach( nameSetValue => {
			var data = [];
			for(var k = 1; k < tableRow.length; k++) {
				if(nameSetValue == tableRow[k][0]) {
					data.push({
						"label": tableRow[k][1],
						"x": tableRow[k][2],
						"y": tableRow[k][3],
						"r": tableRow[k][4]
					});
				}
			}
			series.push({
				"name": nameSetValue,
				"data": data
			});
	});


	// 최종 차트가 요구하는 데이터(resultData 객체) 생성
	var resultData = {
		"series" : series
	}

	var options = {
	    chart: {
			width: 725,
			height: 650,
	        format: function (value, chartType, areaType, valueType) {
	            if (valueType === 'r' || valueType === 'x') {
	                value = tui.chart.renderUtil.formatToComma(value);
	                if (valueType === 'x') {
	                    value = '$' + value;
	                }
	            }
	            return value;
	        }
	    },
	    yAxis: {
	        title: tableRow[0][2]
	    },
	    xAxis: {
	        title: tableRow[0][3]
	    }
	};

	tui.chart.bubbleChart(container, resultData, options);
}

/*
 * 바, 막대, 라인, 영역, 방사형 차트 생성 함수.(다섯개는 요구하는 데이터 형태가 동일 함으로 공통 작업 후 각기 다른 차트 호출.)
 */
var fn_makeCmmnChart = function(tableRow, chart, container, contactIndex) {

	// 데이터 가공시 필요한 변수들 생성.
	var categories	= [];
	var data = {"series" : []};

	for(var i = 1; i< tableRow.length; i++) {
		categories.push(tableRow[i][0]);
	}
	data["categories"] = categories;

	for (var i = 1; i < tableRow[0].length; i++) {
		var jsonObj = {};
		jsonObj["name"] = tableRow[0][i]; // 각 row의 첫번째 값
		var datas = [];
		for(var j = 1; j < tableRow.length; j++) {
			datas.push(tableRow[j][i]);
		}
		jsonObj["data"] = datas;
		data["series"].push(jsonObj);
	}

	// 별다른 옵션이 필요하지 않는 차트들이 사용하는 공통 옵션.
	var options = {
	    chart: {
	        width: 725,
	        height: 650
	    },
	    series: {
	         showLabel: true
	    }
	};

	// 다섯개 차트 호출 부
	if (chart === "bar") {
		tui.chart.barChart(container, data, options);

	} else if (chart === "column") {
		tui.chart.columnChart(container, data, options);
		
	} else if (chart === "line") {
		
		options = {
		    chart: {
		        width: 725,
		        height: 540
		    },
		    yAxis: {
		        title: 'Data',
		    },
		    xAxis: {
		        title: 'Category',
		        pointOnColumn: true,
		        tickInterval: 'auto'
		    },
		    series: {
		        showDot: false,
		        zoomable: true
		    }
		};
		
		var chart = tui.chart.lineChart(container, data, options);
		
	} else if (chart === "area") {
		tui.chart.areaChart(container, data, options);
		
	} else if (chart === "radial") {
		
		options = {
		    chart: {
		        width: 725,
		        height: 700
		    },
		    series: {
		        showDot: false,
		        showArea: false
		    },
		    plot: {
		        type: 'circle'
		    },
		    legend: {
		        align: 'bottom'
		    }
		};
		
		tui.chart.radialChart(container, data, options);
	}
}

var chartTheme = {
		
    series: {
        colors: [
            '#83b14e', '#458a3f', '#295ba0', '#2a4175', '#289399',
            '#289399', '#617178', '#8a9a9a', '#516f7d', '#dddddd'
        ]
    }
};

/*
 * 현재 선택된 차트 모양이 무엇인지 판단하는 함수
 */
var fn_onSelectBox = function() {
	var selectBoxTargetId = "";
		
	$(".sbDiv").each(function() {
		var $this = $(this);
		
		if ($this.css("display") === "block") {
			selectBoxTargetId = $this.attr("id");
		} 
	})
	
	return selectBoxTargetId;
}

/*
 * 그리드를 읽어서 헤더를 동적으로 생성하는 것과 동시에, 차트 모양에 따른 셀렉트박스 종류 선택
 */
var fn_makeSelectBox = function(imageSe, id) {
	var onChart = "";
	var options = "";
//	var options = "<option value=''>선택</option><option value=''>없음</option>";
	
	$(".selectArea").children().remove();
	$(".sbDiv").hide();
	$(".tui-grid-header-area th").each(function() {
		options += "<option>" + $(this).text() + "</option>";
	})
	
	// 차트 이미지를 누를때와 데이터 편집탭을 누를 때를 따로 처리.
	if (imageSe === "Y") {
		
		if (!$("#" + id).hasClass("on")) {
			onChart = id;
		}
	} else {
		$(".chart").each(function() {
			var $this = $(this);
				
			if ($this.hasClass("on")) {
				onChart = $this.attr("id");
			}
		})
	}
	
	var $target = {}
	
	if (onChart === "bar" || onChart === "column" || onChart === "line" || onChart === "radial" || onChart === "area" || onChart === "pie") {
		$target = $("#cmmnChartSelectBox");
	} else {
		$target = $("#" + onChart + "SelectBox");
	}
	
	$target.show();
	$target.find("select").append(options);
}

/*
 * 샘플파일 다운로드 로직
 */
var fn_sampleFileDown = function(sampleFileNm) {
	var downFile	= "/resource/chartSampleData/";
	var fileNm		= "";
	
	if (sampleFileNm === "cmmn") {
		fileNm = "bar_column_line_area_radialChartSampleFile.csv";
	} else if (sampleFileNm === "bubble") {
		fileNm = "bubbleChartSampleFile.csv";
	} else if (sampleFileNm === "scatter") {
		fileNm = "scatterChartSampleFile.csv";
	} else if (sampleFileNm === "pie") {
		fileNm = "pieChartSampleFile.csv";
	} else if (sampleFileNm === "heatmap") {
		fileNm = "heatmapChartSampleFile.csv";
	} else if (sampleFileNm === "treemap") {
		fileNm = "treemapChartSampleFile.csv";
	} else if (sampleFileNm === "map") {
		fileNm = "mapChartSampleFile.csv";
	} else if (sampleFileNm === "boxplot") {
		fileNm = "boxplotChartSampleFile.csv";
	} else if (sampleFileNm === "bullet") {
		fileNm = "bulletChartSampleFile.csv";
	} 
	
	window.open(downFile + fileNm);
}

/*
* 그리드(테이블) 데이터 -> json 형태로 변환 
*/
function fn_converseChart(){
	$('#chart-area').empty();
	
	var container = document.getElementById('chart-area');
	var tableRow = [];
	var header	 = [];
	
	// 올라온 csv 파일의 헤더정보 추출
	$(".tui-grid-header-area th").each(function() {
		header[header.length] = $(this).text();
	})
	tableRow.push(header);
	// 10건 100건 전체 셋중 하나 선택 디폴트 10건
	var sort = $(".sortCb:checked").val();
	
	// 올라온 csv 파일의 데이터를 배열로 추출.
	$(".tui-grid-rside-area .tui-grid-body-area tr").each(function(index) {
		var $td = $(this).find("td");
		var temp = [];
		
		$td.each(function() {
			temp[temp.length] = $(this).text();
		})
		tableRow[tableRow.length] = temp;
		
		if (sort === (index + "") || sort === (index + "")) {
			return false;
		}
	})

	// 현재 선택되어 있는 차트의 종류를 판단하기 위한 작업.
	var chart	= "";
	var boolCmmn 	= false;
	
	$(".chart").each(function() {
		var $this = $(this);
		
		if ($this.hasClass("on")) {
			chart = $this.attr("id");
			boolCmmn = $this.hasClass("cmmn");
		}
	})
	
	// 각 셀렉트 박스에서 선택된 데이터들이 헤더의 몇번째에 있는 행들인지를 판단하는 로직.
	// 선택된 컬럼이 해당 로우의 몇번 컬럼들인지 파악 필요.
	// 그래야 접근이 쉬워짐
	// 버블차트를 예를 들으면 다섯개의 컬럼을 선택받아야 함. 카테고리가 5번열이고, 라벨이 1번열이고, x축이 8번열, y축이 9번열, r값이 22번 열이라고 하면
	// [5, 1, 8, 9, 22] 이렇게 배열에 넣어둬서 데이터 각 행들에서 해당 인덱스로만 찾게 작업을 하면 효율적일거라 판단.
	var contactIndex = [];
	var selectBoxTargetId = fn_onSelectBox();
	
	$("#" + selectBoxTargetId).find(".selectArea").each(function(i) {
		contactIndex[i] = header.indexOf($(this).val());
	})

	// 차트 호출
	if (boolCmmn) {
		fn_makeCmmnChart(tableRow, chart, container, contactIndex);
	} else {
		
		if (chart === "bubble") {
			fn_makeBubbleChart(tableRow, container, contactIndex);
		} else if (chart === "map") {
			fn_makeMapChart(tableRow, container, contactIndex);
		} else if (chart === "scatter") {
			fn_makeScatterChart(tableRow, container, contactIndex);
		} else if (chart === "pie") {
			fn_makePieChart(tableRow, container, contactIndex);
		} else if (chart === "heatmap") {
			fn_makeHeatMapChart(tableRow, container, contactIndex);
		} else if (chart === "treemap") {
			fn_makeTreeMapChart(tableRow, container, contactIndex);
		} else if (chart === "boxplot") {
			fn_makeBoxPlotChart(tableRow, container, contactIndex);
		} else if (chart === "bullet") {
			fn_makeBulletChart(tableRow, container, contactIndex);
		}
	}
}

/*
* 테이블 -> Json으로 변환 
*/
function fn_tableToJson(table){
	
	var data = []; // first row needs to be headers
	
	var headers = [];
	var tempHeaders = $(".tui-grid-rside-area > .tui-grid-header-area").find("th");
	for (var i=0; i<tempHeaders.length; i++) {
		headers[i] = tempHeaders[i].textContent;
	}
	data.push(headers);
	
	// 10건 100건 전체 셋중 하나 선택 디폴트 10건
	var sort = $(".sortCb:checked").val();
	
	// 올라온 csv 파일의 데이터를 배열로 추출.
	$(".tui-grid-rside-area .tui-grid-body-area tr").each(function(index) {
		var $td = $(this).find("td");
		var temp = [];
		
		$td.each(function() {
			temp[temp.length] = $(this).text();
		})
		
		data.push(temp);
	})
	
	return data; 
}

CustomMap = function() {
	this.map = new Object();
};
CustomMap.prototype = {
	put : function(key, value){
		this.map[key] = value;
	},
	get : function(key){
		return this.map[key];
	},
	containsKey : function(key){
		return key in this.map;
	},
	containsValue : function(value){
		for(var prop in this.map){
			if(this.map[prop] == value) return true;
		}
		return false;
	},
	isEmpty : function(key){
		return (this.size() == 0);
	},
	clear : function(){
		for(var prop in this.map){
			delete this.map[prop];
		}
	},
	remove : function(key){
		delete this.map[key];
	},
	keys : function(){
		var keys = new Array();
		for(var prop in this.map){
			keys.push(prop);
		}
		return keys;
	},
	values : function(){
		var values = new Array();
		for(var prop in this.map){
			values.push(this.map[prop]);
		}
		return values;
	},
	size : function(){
		var count = 0;
		for (var prop in this.map) {
			count++;
		}
		return count;
	}
};