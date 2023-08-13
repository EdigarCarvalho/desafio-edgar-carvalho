let PRECOS = {
    cafe: 3,
    chantily: 1.5,
    suco: 6.2,
    sanduiche: 6.5,
    queijo: 2,
    salgado: 7.25,
    combo1: 9.5,
    combo2: 7.5,
};

let ADICIONAIS = {
    chantily: "cafe",
    queijo: "sanduiche",
}

class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens) {
        if(itens.length === 0) 
            return "Não há itens no carrinho de compra!";

        let precoTotalBase = this.calcularPrecoTotalBase(itens);
        if(precoTotalBase.hasOwnProperty("error")) 
            return precoTotalBase.error;

        precoTotalBase = this.aplicarDesconto( precoTotalBase , metodoDePagamento );
        if(precoTotalBase.hasOwnProperty("error")) 
            return precoTotalBase.error;   

        return `R$ ${precoTotalBase.toFixed(2).replace('.', ',')}`;
    }

    calcularPrecoTotalBase(itens){

        let precoTotalBase = 0;
        let produtos = [];

        for (const item of itens) {
            const itemParts = item.split(',');
            const produto = itemParts[0];
            
            const error = this.validarProduto( produto, produtos)
            if(error) return error ;

            produtos.push(produto);

            const quantidade = parseInt(itemParts[1]);

            if ( quantidade <= 0 ) return { error: "Quantidade inválida!" } ;

            precoTotalBase += PRECOS[produto] * quantidade;

            }

            return precoTotalBase;
    }

    validarProduto(produto , produtos){
        if ( !PRECOS.hasOwnProperty(produto) )
             return { error: "Item inválido!" };

        else if ( ADICIONAIS[produto] ){
            const principal = ADICIONAIS[produto];

            if( !produtos.includes(principal) )
                return { error: "Item extra não pode ser pedido sem o principal"} ;
        }

        return;
    }

    aplicarDesconto(precoTotalBase, metodoDePagamento){
        switch(metodoDePagamento){
            case "debito":
                return precoTotalBase; 
            case "dinheiro":
                return precoTotalBase - precoTotalBase * 0.05;
            case "credito":
                return precoTotalBase + precoTotalBase * 0.03;
            default:    
                return { error: "Forma de pagamento inválida!" };      
        }
    }
}

export { CaixaDaLanchonete };