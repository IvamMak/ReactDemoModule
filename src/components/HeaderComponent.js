import React from "react";

class HeaderComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        return (
            <div id="header">
                <header>
                    <nav className="nav d-flex justify-content-between">
                        <div>
                            <a className="p-2 text-muted" href="http://localhost:3000/add-banner/_add">Banners </a>
                            <a className="p-2 text-muted" href="http://localhost:3000/add-category/_add">Categories</a>
                        </div>
                    </nav>
                </header>
            </div>
        );
    }
}

export default HeaderComponent;