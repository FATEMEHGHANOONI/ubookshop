export const Block = props => {
    // Initialize the cart if it doesn't exist
    if (!props.state.cart) {
        props.state.cart = [];
    }
    
    let book = props.book;
    
    return (
        <c-c style={{
            width: 150, 
            height: 300, 
            minWidth: 150, 
            position: "relative", 
            backgroundColor: "white", 
            borderRadius: 10, 
            margin: "10px", 
            boxShadow: "0px 0px 9px 2px rgba(0,0,0,0.43)"
        }}>
            <img
                className={global.styles.hoverzoom_nofade}
                src={book.imageLink}
                style={{
                    height: 200,
                    width: 150,
                    objectFit: "fill",
                    minWidth: 150,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10
                }}
                onClick={() => {
                    props.state.form = "bookspecs";
                    props.state.book = book;
                    props.refresh();
                }}
            />
            <f-cc style={{ padding: "5px 8px", height: 40 }}>
                <f-12>{props.book.title}</f-12>
            </f-cc>
            <hr style={{ width: "90%", opacity: 0.2 }} />
            <f-csb style={{ width: "100%", padding: "5px 0", direction: "rtl" }}>
                <img
                    src={props.state.cart.includes(props.book.title) ?
                        "https://ituring.ir/research/36/shopping-bag.png" :
                        "https://ituring.ir/research/36/shopping-bag%20%283%29.png"}
                    style={{ height: 30, width: 30, objectFit: "contain", direction: "rtl" }}
                    onClick={() => {
                        const cart = [...props.state.cart];
                        if (cart.includes(props.book.title)) {
                            props.state.cart = cart.filter(item => item !== props.book.title);
                        } else {
                            props.state.cart.push(props.book.title);
                        }
                        props.refresh(); // Refresh to update UI
                    }}
                />
                <c-x style={{ direction: "ltr", margin: "0 5px" }}>
                    <f-13><del>Price : {props.book.price}</del></f-13>
                    <f-15>Price : {props.book.price * 0.8 as number}</f-15>
                </c-x>
            </f-csb>
        </c-c>
    );
};