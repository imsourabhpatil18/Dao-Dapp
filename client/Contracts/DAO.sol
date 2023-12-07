// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.19;

contract Dao{

    struct proposal{

        uint id;
        string projectName;
        uint amount;
        address payable recepient;
        uint votes;
        uint end;
        bool isExecuted;

    }
 
    mapping (address => bool) public isInvestor;      //particular address is of investor or not
    mapping(address => uint)public numOfShares;         //how many shares a particulare investor own
    mapping (address =>mapping(uint=>bool))public isVoted;    //checks if particular investor voted or not
    mapping (address=>bool)public withdrawalStatus;
    mapping (uint => proposal)public proposals;     //to store proposals from specific id


    address[]public investorsList;
    

   uint public totalShares;      
   uint public availableFunds;   
   uint public participationTimeEnd;   
   uint public nextProposalId;   
   uint public voteTime;   
   uint public quorum;   
   address public  manager;


   constructor(uint _participationTimeEnd, uint _voteTime,uint _quorum)  {
    require(_quorum>0 && _quorum<=100);
    participationTimeEnd=block.timestamp+ _participationTimeEnd;
    voteTime=block.timestamp+ _voteTime;
    quorum= _quorum;
    manager = msg.sender;
   }

   modifier onlyInvestor (){
    require(isInvestor[msg.sender]==true,"you are not an investor");
    _;
   }

   modifier onlyManager(){
    require(manager==msg.sender,"you are not a manager");
    _;
   }

   function contribution()external payable {     //1 share= 1 wei

    require(participationTimeEnd>=block.timestamp,"contribution time ends");
    require(msg.value>0,"contribution amount should be greter than 0");

    isInvestor[msg.sender]=true;
    numOfShares[msg.sender]+= msg.value;
    totalShares+= msg.value;
    investorsList.push(msg.sender);
    availableFunds+=msg.value;
   }

   function redeemShares(uint amount)external onlyInvestor{
    require(numOfShares[msg.sender]>=amount,"you do not have sufficient shares");
    require(availableFunds>=amount,"no sufficient fund available");

    numOfShares[msg.sender]-=amount;
    if(numOfShares[msg.sender]==0){
        isInvestor[msg.sender]=false;
    }

    availableFunds-=amount;
    payable(msg.sender).transfer(amount);
     
   }

   function transferShares(uint amount, address to)external onlyInvestor{
    require(numOfShares[msg.sender]>=amount,"you do not have sufficient shares");
     require(availableFunds>=amount,"no sufficient fund available");

   numOfShares[msg.sender]-=amount;
    if(numOfShares[msg.sender]==0){
        isInvestor[msg.sender]=false;
    }

    numOfShares[to]+=amount;

    if(isInvestor[to]==false){
        isInvestor[to]=true;
    }
    
    payable(to).transfer(amount);

   }
 
   function createProposal(string memory projectName , uint amount , address payable recepient)public onlyInvestor{
    require(amount<=availableFunds,"no sufficient funds available");

    proposals[nextProposalId]=proposal(nextProposalId, projectName, amount, recepient, 0, block.timestamp+voteTime,false);
    nextProposalId++;
   
   }

  function voteProposal(uint proposalId)public onlyInvestor{
    require(isVoted[msg.sender][proposalId]==false,"you have already voted for this proposal");
    require(proposals[proposalId].end>=block.timestamp,"voting time ended for this proposal");
   
    isVoted[msg.sender][proposalId]=true;
    proposals[proposalId].votes+=numOfShares[msg.sender];
    
  }

  function executeProposal(uint proposalId)public onlyManager{
 
    require(((proposals[proposalId].votes)*100/totalShares)>=quorum,"minimum quorun required");
     require(proposals[proposalId].isExecuted==false,"already executed");
    proposals[proposalId].isExecuted=true;

    _transfer(proposals[proposalId].amount, proposals[proposalId].recepient);

  }

  function _transfer(uint amount,address payable to)internal{
    require(amount<availableFunds,"insufficient amount");
    availableFunds-=amount;
    to.transfer(amount);
  }

  function allow(address to)public onlyManager{
    withdrawalStatus[to]=true;
   }

    function disallow(address to)public onlyManager{
    withdrawalStatus[to]=false;
   }

   function withdrawAllEther()public{
    require(withdrawalStatus[msg.sender]==true,"you are not allowed to withdraw");
    numOfShares[msg.sender]=0;
     isInvestor[msg.sender]=false;
  
    _transfer(numOfShares[msg.sender], payable (msg.sender) );

   }

   function proposalList()public view returns(proposal[]memory){

    proposal[]memory arr=new proposal[](nextProposalId-1);
    for(uint i=0; i<nextProposalId;i++){
       arr[i]=proposals[i];
    }
    return arr;
   
   }

   function investorList()public view returns(address[]memory){
    return investorsList;
   }
   }













