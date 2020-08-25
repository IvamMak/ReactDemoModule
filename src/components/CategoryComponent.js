import React from "react";
import CategoryService from "../services/CategoryService";

class CategoryComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            name: '',
            reqName: '',
            deleted: '',
            categories: [],
            errorText: ''
        };
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeRequestNameHandler = this.changeRequestNameHandler.bind(this);
        this.saveOrUpdateCategory = this.saveOrUpdateCategory.bind(this);

        this.addCategory = this.addCategory.bind(this);
        this.updateCategory = this.updateCategory.bind(this);
    }

    componentDidMount() {
        CategoryService.getAllCategories().then((res) => {
            this.setState({categories: res.data});
        })

        if (this.state.id === '_add') {
            return;
        } else {
            CategoryService.getCategoryById(this.state.id).then((res) => {
                let category = res.data;
                this.setState({name: category.name, reqName: category.reqName});
            });
        }
    }

    addCategory() {
        this.props.history.push('/add-category/_add');
        window.location.reload();
    }

    updateCategory(id) {
        this.props.history.push(`/add-category/${id}`);
        window.location.reload();
    }

    changeNameHandler = (event) => {
        this.setState({name: event.target.value});
    }

    changeRequestNameHandler = (event) => {
        this.setState({reqName: event.target.value});
    }

    saveOrUpdateCategory = (e) => {
        e.preventDefault();
        const isValid = this.validate();

        if (isValid) {
            let category = {
                name: this.state.name, reqName: this.state.reqName, deleted: false
            }

            console.log('category => ' + JSON.stringify(category));

            if (this.state.id === '_add') {
                CategoryService.createCategory(category).then(res => {
                    this.props.history.push('/add-category/_add');
                    window.location.reload();
                });
            } else {
                CategoryService.updateCategory(category, this.state.id).then(res => {
                    this.props.history.push('/category');
                    window.location.reload();
                })
            }
        }
    }

    deleteCategory = (e) => {
        e.preventDefault();
        let category = {
            name: this.state.name, reqName: this.state.reqName, deleted: true
        };

        console.log('category => ' + JSON.stringify(category));

        CategoryService.updateCategory(category, this.state.id).then(res => {
            this.props.history.push('/category');
            window.location.reload();
        })
    }

    cancel = (e) => {
        e.preventDefault();
        this.props.history.push('/category/');
        window.location.reload();
    }

    getTitle() {
        if (this.state.id === '_add') {
            return <h3 className="ml-2 p-3">Create new category</h3>;
        } else {
            return <h3 className="ml-2 p-3">Update category</h3>;
        }
    }

    getButtonActivity() {
        if (this.state.id === '_add') {
            return <button className="btn btn-danger" onClick={this.cancel.bind(this)}>Cancel</button>;
        } else {
            return <button className="btn btn-danger" onClick={this.deleteCategory.bind(this)}>Delete</button>;
        }
    }

    validate = () => {
        if (this.state.name.length === 0) {
            this.state.errorText = "Please enter name of category";
            return false;
        }

        if (this.state.reqName.length === 0) {
            this.state.errorText = "Please enter name of request";
            return false;
        }
        return true;
    }

    render() {
        return (
            <div className="row">
                <div id="block1">
                    <h3 className="text-center p-3">Categories</h3>
                    <div className="list-group">
                        {
                            this.state.categories.map(
                                category =>
                                    <tr key={category.id}>
                                        <td>
                                            <a href="#" className="text-reset ml-2"
                                               onClick={() => this.updateCategory(category.id)}>{category.name}</a>
                                        </td>
                                    </tr>
                            )
                        }
                    </div>
                    <div>
                        <button className="btn btn-info text-reset p" id="button"
                                onClick={this.addCategory}>Create new category
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
                                    <input type="text" name="categoryName" className="form-control"
                                           value={this.state.name} onChange={this.changeNameHandler}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label ml-5">Request ID</label>
                                <div className="col-sm-5">
                                    <input type="text" name="categoryReqName" className="form-control"
                                           value={this.state.reqName} onChange={this.changeRequestNameHandler}/>
                                </div>
                            </div>
                            <button className="btn btn-danger" onClick={this.saveOrUpdateCategory.bind(this)}>Save
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

export default CategoryComponent;