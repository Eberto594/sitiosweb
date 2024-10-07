var process_transaction = function(account, transaction) {
	//compara el numero de cuenta si es igual a la cuenta de la que viene la trasaccion
	if(account.account_number == transaction.from_account) {
		//si es verdad, se le resta la cantidad a la cuenta dada
		account.current_balance = account.current_balance - transaction.amount;
	} else {
		//si el numero de cuenta es igual a la trasaccion de la cuenta
		if(account.account_number == transaction.to_account) {
			//se le suma al cantidad de la trasaccion a la cuenta actual
			account.current_balance = account.current_balance + transaction.amount;
		} else {
			// Do nothing
		}
	}
};

