var modal_status = "";

$(function () {
	
	// email 부분
	$("#email").change(function() {
		$("#emailDuplication").val("emailUncheck");
		$("#emailEx").text("중복체크를 해주세요");
	})
	
	$("#email_check").click(function(){
		frm = document.forms['joinform'];
		email = frm['email'].value;
		
		var Ereg = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
		
		if(email == "") {
			alert("이메일은 필수입니다.");
			frm['email'].focus();
			
			return false;
			
		} else if(Ereg.test(email) == false) {
			alert("이메일 형식이 올바르지 않습니다.");
			frm['email'].focus();
			
			return false;
		}
		checkEmailDuplication();
	});
	// nickname 부분
	$("#nickname").change(function () {
		$("#nicknameDuplication").val("emailUncheck");
		$("#nicknameEx").text("중복체크를 해주세요");
	})
		
	$("#nickname_check").click(function(){

		frm = document.forms['joinform'];
		nickname = frm['nickname'].value;
		
		var Nreg = /^[0-9a-zA-Z가-힣]+$/;
		
		if(nickname == "") {
			alert("닉네임은 필수입니다.");
			frm['nickname'].focus();
			
			return false;
			
		} else if(Nreg.test(nickname) == false) {
			alert("닉네임 형식이 올바르지 않습니다.(특수기호 불가)");
			frm['nickname'].focus();
			
			return false;
		}

		checkNicknameDuplication();
	});
	
	// 로그인 시 해당 페이지 url 저장하기위함
	$("#btnLogin").click(function(){
		modal_status = "login";
		$.ajax({
		url : "/logincheck/",
		type : "GET",
		cache : false
		});	

		setPopup("login");    // 글 작성 용으로 모달 팝업 셋업
			$("#dlg_login").show();
		});
		
		$(".headC").click(function(){
			$(".headE").slideToggle();
		});
		
		$("#btnJoin").click(function(){
			modal_status = "join";
			setPopup("join");    // 글 작성 용으로 모달 팝업 셋업
			$("#dlg_login").show();
		});
	
	// 로그아웃 버튼
	$("#btnLogout").click (function(){
		alert("로그아웃되셨습니다.");

		$.ajax({
		url : "/logoutcheck",
		type : "GET",
		cache : false
		});
		
		location.href="/logout";
		
		
	});	
	
	
	
	// 모달 창 내 버튼 부분
	$("#btn_go_join").click(function(){
		modal_status = "join";
		setPopup("join");
	});
	
	$(".modal .close").click(function(){
		if(modal_status == "join") {
			Swal.fire({
				icon: 'warning',
				title: '회원 가입 취소',
				text: '회원 가입 창을 닫을 경우 해당 정보는 다 삭제됩니다.',
				showDenyButton: true,
				confirmButtonText: '닫기 취소',
				denyButtonText: `닫기`,
				}).then((result) => {
					if (result.isConfirmed) {
						
					} 
					else if (result.isDenied) {
						clear_modal_main()
						$(this).parents(".modal").hide();
					}
	        });
		}
		else {
			clear_modal_main()
			$(this).parents(".modal").hide();
		}
	});
	
	// 모달 창 외부 클릭시 모달창 닫기
	$(".modal").click(function(e){
		var modal = $(".modal-content")
		if(modal.has(e.target).length === 0){
				if(modal_status == "join") {
				Swal.fire({
					icon: 'warning',
					title: '회원 가입 취소',
					text: '회원 가입 창을 닫을 경우 해당 정보는 다 삭제됩니다.',
					showDenyButton: true,
					confirmButtonText: '닫기 취소',
					denyButtonText: `닫기`,
					}).then((result) => {
						if (result.isConfirmed) {
							
						} 
						else if (result.isDenied) {
							clear_modal_main()
							$(this).hide();
						}
		        });
			}
			else {
				clear_modal_main()
				$(this).hide();
			}
		}
	});
	
	
});

function setPopup(mode){
	
	if(mode == "login"){
		$("#dlg_login .title").text("로그인");
		$("#dlg_login .btn_login").show();
		$("#dlg_login .btn_join").hide();
	}
	
	if(mode == "join"){

		$("#dlg_login .title").text("회원가입");
		$("#dlg_login .btn_login").hide();
		$("#dlg_login .btn_join").show();
	}
}// end setPopup()

function chkJoin (){
	frm = document.forms['joinform'];
	// 비밀번호 확인
	pw = frm['pw'].value;
	pwC = frm['pwC'].value;
	
	if(pw != pwC) {
		alert("비밀번호가 같지 않습니다. 다시 확인해주세요");
		frm['pwC'].focus();
		
		return false;
		
	}
	
	// 전화번호 확인
	var result = "";
	result += frm['phonenum1'].value.trim() + "-";
	result += frm['phonenum2'].value.trim() + "-";
	result += frm['phonenum3'].value.trim();
	
	frm['phoneNumber'].value = result;

	var Preg =  /^\d{2,3}-\d{3,4}-\d{4}$/;
	
	if(Preg.test(frm['phoneNumber'].value) == false) {
		alert("전화번호 형식이 올바르지 않습니다");
		frm['phoneNumber'].focus();
		
		return false;
	}
	
	alert("회원가입이 완료되었습니다.");
	return true;
 }


function checkEmailDuplication () {
	var email = $('#email').val();
	
	$.ajax({
		url : "/checkemail/" + email,
		type : "GET",
		cache : false,
		success : function(data, status){
			if(status == "success"){
				if(data == 0) {
					$("#emailDuplication").val("emailCheck");
					$("#emailEx").text("사용 가능한 이메일입니다.");
				}
				else {
					$("#emailDuplication").val("emailUncheck");
					$("#emailEx").text("이미 존재하는 이메일입니다.");
				}
			}
			
		}
	});	
}

function checkNicknameDuplication () {
	var nickname = $('#nickname').val();

	$.ajax({
		url : "/checknickname/" + nickname,
		type : "GET",
		cache : false,
		success : function(data, status){
			if(status == "success"){
				if(data == 0) {
					$("#nicknameDuplication").val("nicknameCheck");
					$("#nicknameEx").text("사용 가능한 닉네임입니다.");
				}
				else {
					$("#nicknameDuplication").val("nicknameUncheck");
					$("#nicknameEx").text("이미 존재하는 닉네임입니다.");
				}
			}
		}
	});	
}

function gourl(url) {
	location.href=url;
}

function clear_modal_main() {
	$("#loginform")[0].reset();
	$("#joinform")[0].reset();
}