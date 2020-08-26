import React from "react";
import BannerService from "../services/BannerService";
import CategoryService from "../services/CategoryService";
import LiveSearch from "../tools/LiveSearch";

class BannerComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            name: '',
            price: '',
            content: '',
            deleted: '',
            banners: [],
            categoryName: '',
            categories: [],
        };
        this.changeBannerNameHandler = this.changeBannerNameHandler.bind(this);
        this.changePriceHandler = this.changePriceHandler.bind(this);
        this.changeContentHandler = this.changeContentHandler.bind(this);
        this.saveOrUpdateBanner = this.saveOrUpdateBanner.bind(this);

        this.addBanner = this.addBanner.bind(this);
        this.deleteBannerFromUI = this.deleteBannerFromUI.bind(this);
    }

    componentDidMount() {
        BannerService.getAllBanners().then((res) => {
            this.setState({banners: res.data});
        });
        CategoryService.getAllCategories().then((res) => {
            this.setState({categories: res.data});
        })

        if (this.state.id === '_add') {
            return;
        } else {
            BannerService.getBannerById(this.state.id).then((res) => {
                let banner = res.data;
                this.setState({
                    name: banner.name, price: banner.price,
                    content: banner.content, category: banner.category
                });
            });
        }
    }

    addBanner() {
        this.props.history.push('/add-banner/_add');
        window.location.reload();
    }

    deleteBannerFromUI(id) {
        this.props.history.push(`/add-banner/${id}`);
        window.location.reload();
    }

    changeBannerNameHandler = (event) => {
        this.setState({name: event.target.value});
    }

    changePriceHandler = (event) => {
        this.setState({price: event.target.value});
    }

    changeContentHandler = (event) => {
        this.setState({content: event.target.value});
    }

    saveOrUpdateBanner = (e) => {
        e.preventDefault();
        const isValid = this.validate();

        if (isValid) {
            let banner = {
                name: this.state.name, price: this.state.price,
                content: this.state.content, deleted: false
            };
            console.log('banner => ' + JSON.stringify(banner));

            if (this.state.id === '_add') {
                BannerService.createBanner(banner).then(res => {
                    this.props.history.push('/banner');
                    window.location.reload();
                });
            } else {
                BannerService.updateBanner(banner, this.state.id).then(res => {
                    this.props.history.push('/banner');
                    window.location.reload();
                })
            }
        }
    }

    deleteBanner = (e) => {
        e.preventDefault();
        let banner = {
            name: this.state.name, price: this.state.price,
            content: this.state.content, deleted: true, category: this.createCategory()
        };
        console.log('banner => ' + JSON.stringify(banner));

        BannerService.updateBanner(banner, this.state.id).then(res => {
            this.props.history.push('/banner/');
            window.location.reload();
        })
    }

    cancel = (e) => {
        e.preventDefault();
        this.props.history.push('/banner/');
        window.location.reload();
    }

    getTitle() {
        if (this.state.id === '_add') {
            return <h3 className="ml-2 p-3">Create new banner</h3>;
        } else {
            return <h3 className="ml-2 p-3">Update banner</h3>;
        }
    }

    getButtonActivity() {
        if (this.state.id === '_add') {
            return <button className="btn btn-danger" id="deleteButton"
                           onClick={this.cancel.bind(this)}>Cancel</button>;
        } else {
            return <button className="btn btn-danger" id="deleteButton"
                           onClick={this.deleteBanner.bind(this)}>Delete</button>;
        }
    }

    validate = () => {
        if (this.state.name.length === 0) {
            this.state.errorText = "Please enter name of category";
            return false;
        }

        if (this.state.content.length === 0) {
            this.state.errorText = "Please enter content of banner";
            return false;
        }

        if (this.state.content.price === 0) {
            this.state.errorText = "Please enter price of banner";
            return false;
        }

        if (this.state.content.category === 0) {
            this.state.errorText = "Please enter category of banner";
            return false;
        }
        return true;
    }

    render() {
        return (
            <div className="row">
                <div id="block1">
                    <h3 className="text-center p-3">Banners</h3>
                    <input type="text"
                           id="searchBar"
                           name="search"
                           onKeyUp={LiveSearch.searchItems}
                           placeholder="Enter banner name...">
                    </input>
                    <div>
                        {
                            this.state.banners
                                .map(
                                    banner =>
                                        <ul>
                                            <li className="itemsForSearch">
                                                <a href="#" className="text-reset ml-2"
                                                   onClick={() => this.deleteBannerFromUI(banner.id)}>{banner.name}
                                                </a>
                                            </li>
                                        </ul>
                                )
                        }
                    </div>
                    <div>
                        <button className="btn btn-primary" id="createButton"
                                onClick={this.addBanner}>Create new Banner
                        </button>
                    </div>
                </div>
                <div id="block2">
                    {
                        this.getTitle()
                    }
                    <div>
                        <form>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label ml-5">Name</label>
                                <div className="col-sm-5">
                                    <input type="text"
                                           name="bannerName"
                                           className="form-control"
                                           value={this.state.name}
                                           onChange={this.changeBannerNameHandler}>
                                    </input>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label ml-5">Price</label>
                                <div className="col-sm-5">
                                    <input type="number" name="bannerPrice" className="form-control"
                                           value={this.state.price} onChange={this.changePriceHandler}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label ml-5">Category</label>
                                <div className="col-sm-5">
                                    <select className="form-control" id="exampleFormControlSelect1">
                                        {
                                            this.state.categories.map(
                                                category =>
                                                    <option>{category.name}</option>
                                            )
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label ml-5">Text</label>
                                <div className="col-sm-5">
                                    <textarea name="bannerText" className="form-control"
                                              value={this.state.content} onChange={this.changeContentHandler}/>
                                </div>
                            </div>
                            <button className="btn btn-dark" id="saveButton"
                                    onClick={this.saveOrUpdateBanner.bind(this)}>Save
                            </button>
                            {
                                this.getButtonActivity()
                            }
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default BannerComponent;