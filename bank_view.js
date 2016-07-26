var BankView = function(bank){
  this.bank = bank;
}

BankView.prototype = {
  showTotalCash: function(){
    var total = document.getElementById('total')
    total.innerText = "Total cash in bank: £" + this.bank.totalCash().toFixed(2);
  },

  populateLists: function(){
    var select = document.getElementById('personal-select');
    for(var account of this.bank.accounts){
      if(account.type === 'personal'){
        var option = document.createElement('option')
        option.value = account.owner
        option.innerText = account.owner
        select.appendChild(option)
      }
    }

    var select = document.getElementById('business-select')
    for(var account of this.bank.accounts){
      if(account.type === 'business'){
        var option = document.createElement('option')
        option.value = account.owner
        option.innerText = account.owner
        select.appendChild(option)
      }
    }
  },

  findAccount: function(name){
    for(var account of this.bank.accounts){
      if(account.owner === name){
        return account
      }
    }
  },

  addListeners: function(){
    var interestBtn = document.getElementById('addIntBtn')
    interestBtn.onclick = function(){
      this.bank.addInterest(10)
      this.showTotalCash();
    }.bind(this)//end of interest btn

    var personalSelect = document.getElementById('personal-select')
    personalSelect.onchange = function(){
      console.log('Personal list changed')
      var selectedAccount = document.getElementById("personal-select")
      var accountHolder = selectedAccount.options[selectedAccount.selectedIndex].text;
      accountHolder = this.findAccount(accountHolder)
      this.populateAccountInfo(accountHolder)
    }.bind(this)

    var businessSelect = document.getElementById('business-select')
    businessSelect.onchange = function(){
      console.log('Business list changed')
      var selectedAccount = document.getElementById("business-select")
      var accountHolder = selectedAccount.options[selectedAccount.selectedIndex].text;
      accountHolder = this.findAccount(accountHolder)
      this.populateAccountInfo(accountHolder)
    }.bind(this)

  },//end of listeners

  populateAccountInfo: function(account){
    var accountInfo = document.getElementById('account-info');
    accountInfo.innerHTML = '';
    var h3 = document.createElement('h3');
    h3.innerText = account.owner;
    var p = document.createElement('p');
    p.innerText = "Account type: " + account.type + " Available funds: £" + account.amount.toFixed(2)
    accountInfo.appendChild(h3)
    accountInfo.appendChild(p)
  }


}//end of prototype

module.exports = BankView;