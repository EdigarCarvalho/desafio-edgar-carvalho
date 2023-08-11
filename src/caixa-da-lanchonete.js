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


class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens) {
        if(itens.length === 0)
            return "Não há itens no carrinho de compra!";

        let precoTotal = 0;
        
        itens.forEach(item => {
            item = item.split(',');
            let produto = item[0];
            let quantidade = parseInt(item[1]);
            precoTotal += preco[produto] * quantidade;
        });

        switch(metodoDePagamento){
            case "debito":
                break; 
            case "dinheiro":
                precoTotal -= precoTotal * 0.05
                break;
            case "credito":
                precoTotal += precoTotal * 0.03
                break;      
        }

        return `R$ ${precoTotal.toFixed(2).replace('.', ',')}`;

        }

}

export { CaixaDaLanchonete };
