package com.lec.spring.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lec.spring.domain.board.BoardDAO;
import com.lec.spring.domain.board.BoardDTO;
import com.lec.spring.domain.member.MemberDAO;
import com.lec.spring.domain.report.ReportDAO;

@Service
public class AdminService {
	// DAO 객체 생성
	BoardDAO Bdao;
	ReportDAO Rdao;
	MemberDAO Mdao;
	
	
	// 자동 넣기 Autowired 
	@Autowired
	public void setBdao(BoardDAO Bdao) {
		this.Bdao = Bdao;
	}
	
	@Autowired
	public void setRdao(ReportDAO Rdao) {
		this.Rdao = Rdao;
	}
	
	@Autowired
	public void setMdao(MemberDAO Mdao) {
		this.Mdao = Mdao;
	}
	
	
	// dao 를 활용한 트랜잭션들 담을 예정(admin)
	
	
	// 공지사항 정보를 가져온다
	public List<BoardDTO> noticeList(){
		return Bdao.selectNotice();
	}
	
	// 공지사항 게시판 글의 개수를 카운트해서 가져온다.
	public int countNtc() {
		return Bdao.countNtc();
	}
	
	// 공지사항 정보를 from 부터 pageRows 개를 가져온다.
	public List<BoardDTO> ntcUpdateList(int from , int pageRows) {
		return Bdao.selectFromRowNtc(from, pageRows);
	}
	
	// 공지사항 정보를 삭제한다
	public int deleteByNtc (int [] board_uid) {
		return Bdao.deleteByNtc(board_uid);
	}
	
	// 공지사항 작성하기, 정보를 DB에 저장한다
	public int write(BoardDTO dto) {
		return Bdao.insertNtc(dto);
	}
	
	
	
	// 게시판 정보를 가져온다
	public List<BoardDTO> communityList(){
		return Bdao.selectCommunity();
	}
	
	// 커뮤티니 게시판 글의 개수를 카운트해서 가져온다.
	public int countCmt() {
		return Bdao.countAll();
	}
	// 커뮤니티 게시판 정보를 from 부터 pageRows 개를 가져온다.
	public List<BoardDTO> cmtUpdateList(int from , int pageRows) {
		return Bdao.selectFromRowCmt(from, pageRows);
	}
	// 정보 게시판 리스트 가져오기
	// TODO
	
	// 자유 게시판 리스트 가져오기
	// TODO
	
	// 게시글을 삭제한다
	public int deleteByCmt(int [] board_uid) {
		return Bdao.deleteByCmt(board_uid);
	}

	// 체크된 게시글 삭제 ?
	// TODO
	
	// 게시글을 본다
	
	
	
	
	// 신고접수 리스트 가져오기
	// TODO
	
	// 신고취하
	// TODO
	
	// 글 삭제
	// TODO
	
	
	
	// 회원 리스트 가져오기 (페이징)
	// TODO
	
	// 강퇴기능
	// TODO
	
	// 검색기능
	// TODO

	// 매퍼 dAo 1:1
	// 서비스 트랜잭션 1:n (모르겠음 1:1)
	
}
