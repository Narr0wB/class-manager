
import { Fragment } from "react"; // Import fragment, which is an element that acts like a div without being compiled into a div

function ListGroup() {
    let items = [
        'Eddu',
        'Gaming',
        'Luh boosie',
        'MAO'
    ];
    //items = [];

    if (items.length === 0)
        return <h1>No items found</h1>;

    
    return (
        <Fragment>
            <h1>Eddu hogy</h1>
            <ul className="list-group">
                {items.map(item => <li key={item} className="list-group-item">{item}</li>)}
            </ul>
        </Fragment>
    );
}

export default ListGroup;