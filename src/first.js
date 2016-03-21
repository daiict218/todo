var TodoApp = React.createClass({
	    	getInitialState: function(){
	    		return {items: [], filter: "Active"};
	    	},		
	    	newItemEvent: function(newItem){
	    		var itemsCopy = this.state.items.slice();
	    		//status false for not completed and true for completed
	    		var object = {item: newItem, status: false};
	    		itemsCopy.push(object);
                this.setState({items: itemsCopy});
            },
            completedItemEvent: function(event){
	    		var id = event.target.id, itemsCopy = this.state.items.slice();
	    		console.log(itemsCopy,id);
	    		itemsCopy[id].status === true ? itemsCopy[id].status = false : itemsCopy[id].status = true;
	 			this.setState({items: itemsCopy});
	 			console.log(this.state.items);
	    	},
	    	eventToShowList: function(event){
	    		var option = event.target.value;
	    		this.setState({filter: option});
	    	},
	    	render: function(){
	    		return (
	    			<div>
	    				<TodoForm newItemEvent={this.newItemEvent}/>
	    				<TodoItems completedItemEvent = {this.completedItemEvent} items = {this.state.items} filter={this.state.filter}/>
	    				<TodoFooter eventToShowList={this.eventToShowList} filter={this.state.filter}/>
	    			</div>
	    			);
	    	}
	    });

	    var TodoForm = React.createClass({
	    	getInitialState: function(){
	    		return {item: ''};
	    	},
	    	inputChangeEvent: function(event){
	    		var inputValue = event.target.value;
	    		this.setState({item: inputValue});
	    	},
	    	buttonChangeEvent: function(event){
	            event.preventDefault();
	            this.props.newItemEvent(this.state.item);
	            this.setState({item: ''});
            },
	    	render: function(){
	    		return (
	    			<div>
	    				<form onSubmit={this.buttonChangeEvent}>
	    					<input type="text" value={this.state.item} onChange={this.inputChangeEvent} />
	    					<input type="submit" />
	    				</form>
	    			</div>
	    			);
	    	}
	    });

	    var TodoItems = React.createClass({
	    	showAllItems: function(){
	    		var allItems = [];
	    		var self = this;
	    		this.props.items.forEach(function(item,index){
	    			allItems.push(<div key={"item"+index}><input type='checkbox' id={index} onClick={self.props.completedItemEvent} /><span>{self.props.items[index].item}</span></div>);
	    		});
	    		console.log(allItems);
	    		return allItems;
	    	},
	    	showActiveItems: function(){
	    		var allItems = [];
	    		var self = this;
	    		this.props.items.length !== 0 ? allItems.push(<div key={"Heading"}>Check to complete a task</div>): allItems.push(<div key={"Heading"}></div>);
	    		this.props.items.forEach(function(item,index){
	    			if(item.status === false){
	 					allItems.push(<div key={"item"+index}><input type='checkbox' id={index} onClick={self.props.completedItemEvent} /><span>{self.props.items[index].item}</span></div>);
	 					}
	    		});
	    		console.log(allItems);
	    		return allItems;
	    	},
	    	showCompletedItems: function(){
	    		var allItems = [];
	    		var self = this;
	    		this.props.items.forEach(function(item,index){
	    			if(item.status === true){
	 					allItems.push(<div key={"item"+index}><input type='checkbox' id={index} onClick={self.props.completedItemEvent} defaultChecked /><span>{self.props.items[index].item}</span></div>);
	 					}
	    		});
	    		console.log(allItems);
	    		return allItems;
	    	},
	    	render: function(){
	    		var filterToPrint;
	    		if(this.props.filter === "Active"){
	    			filterToPrint = this.showActiveItems();
	    		}
	    		else if(this.props.filter === "Completed"){
	    			filterToPrint = this.showCompletedItems();
	    		}
	    		else if(this.props.filter === "All"){
	    			filterToPrint = this.showAllItems();
	    		}
	    		return (
	    			<div>
	    				{filterToPrint}
	    			</div>
	    			);
	    	}
	    });

	    var TodoFooter = React.createClass({
	    	shouldComponentUpdate: function(nextProps, nextState){
	    		if(this.props.filter === nextProps.filter) return false;
	    		return true;
	    	},
	    	render: function(){
	    		return (
	    			<div>
	    				<select onChange={this.props.eventToShowList}>
						  <option value="Active">Active</option>
						  <option value="Completed">Completed</option>
						  <option value="All">All</option>
						</select>
	    			</div>
	    			);
	    	}
	    });

	    ReactDOM.render(
			<TodoApp />,
			document.getElementById('content')
		);