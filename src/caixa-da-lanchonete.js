let preco = {
    cafe: 3,
    chantily: 1.5,
    suco: 6.2,
    sanduiche: 6.5,
    queijo: 2,
    salgado: 7.25,
    combo1: 9.5,
    combo2: 7.5,
};

let adicionais = {
    chantily: "cafe",
    queijo: "sanduiche",
}

class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens) {
        if(itens.length === 0) 
            return "Não há itens no carrinho de compra!";

        let precoTotal = 0;
        let produtos = [];

        for (const item of itens) {
            const itemParts = item.split(',');
            const produto = itemParts[0];
            
            if ( !preco.hasOwnProperty(produto) ) return "Item inválido!";
            else if ( adicionais[produto] ){
                const principal = adicionais[produto];
                if( !produtos.includes(principal) ) return "Item extra não pode ser pedido sem o principal"
            }
            
            produtos.push(produto);

            const quantidade = parseInt(itemParts[1]);

            if ( quantidade <= 0 ) return "Quantidade inválida!"

            precoTotal += preco[produto] * quantidade;
        }


        switch(metodoDePagamento){
            case "debito":
                break; 
            case "dinheiro":
                precoTotal -= precoTotal * 0.05
                break;
            case "credito":
                precoTotal += precoTotal * 0.03
                break;
            default:    
                return "Forma de pagamento inválida!"      
        }

        return `R$ ${precoTotal.toFixed(2).replace('.', ',')}`;

        }
}

export { CaixaDaLanchonete };