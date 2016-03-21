var TodoApp = React.createClass({
	displayName: 'TodoApp',

	getInitialState: function () {
		return { items: [], filter: "Active" };
	},
	newItemEvent: function (newItem) {
		var itemsCopy = this.state.items.slice();
		//status false for not completed and true for completed
		var object = { item: newItem, status: false };
		itemsCopy.push(object);
		this.setState({ items: itemsCopy });
	},
	completedItemEvent: function (event) {
		var id = event.target.id,
		    itemsCopy = this.state.items.slice();
		console.log(itemsCopy, id);
		itemsCopy[id].status === true ? itemsCopy[id].status = false : itemsCopy[id].status = true;
		this.setState({ items: itemsCopy });
		console.log(this.state.items);
	},
	eventToShowList: function (event) {
		var option = event.target.value;
		this.setState({ filter: option });
	},
	render: function () {
		return React.createElement(
			'div',
			null,
			React.createElement(TodoForm, { newItemEvent: this.newItemEvent }),
			React.createElement(TodoItems, { completedItemEvent: this.completedItemEvent, items: this.state.items, filter: this.state.filter }),
			React.createElement(TodoFooter, { eventToShowList: this.eventToShowList, filter: this.state.filter })
		);
	}
});

var TodoForm = React.createClass({
	displayName: 'TodoForm',

	getInitialState: function () {
		return { item: '' };
	},
	inputChangeEvent: function (event) {
		var inputValue = event.target.value;
		this.setState({ item: inputValue });
	},
	buttonChangeEvent: function (event) {
		event.preventDefault();
		this.props.newItemEvent(this.state.item);
		this.setState({ item: '' });
	},
	render: function () {
		return React.createElement(
			'div',
			null,
			React.createElement(
				'form',
				{ onSubmit: this.buttonChangeEvent },
				React.createElement('input', { type: 'text', value: this.state.item, onChange: this.inputChangeEvent }),
				React.createElement('input', { type: 'submit' })
			)
		);
	}
});

var TodoItems = React.createClass({
	displayName: 'TodoItems',

	showAllItems: function () {
		var allItems = [];
		var self = this;
		this.props.items.forEach(function (item, index) {
			allItems.push(React.createElement(
				'div',
				{ key: "item" + index },
				React.createElement('input', { type: 'checkbox', id: index, onClick: self.props.completedItemEvent }),
				React.createElement(
					'span',
					null,
					self.props.items[index].item
				)
			));
		});
		console.log(allItems);
		return allItems;
	},
	showActiveItems: function () {
		var allItems = [];
		var self = this;
		this.props.items.length !== 0 ? allItems.push(React.createElement(
			'div',
			{ key: "Heading" },
			'Check to complete a task'
		)) : allItems.push(React.createElement('div', { key: "Heading" }));
		this.props.items.forEach(function (item, index) {
			if (item.status === false) {
				allItems.push(React.createElement(
					'div',
					{ key: "item" + index },
					React.createElement('input', { type: 'checkbox', id: index, onClick: self.props.completedItemEvent }),
					React.createElement(
						'span',
						null,
						self.props.items[index].item
					)
				));
			}
		});
		console.log(allItems);
		return allItems;
	},
	showCompletedItems: function () {
		var allItems = [];
		var self = this;
		this.props.items.forEach(function (item, index) {
			if (item.status === true) {
				allItems.push(React.createElement(
					'div',
					{ key: "item" + index },
					React.createElement('input', { type: 'checkbox', id: index, onClick: self.props.completedItemEvent, defaultChecked: true }),
					React.createElement(
						'span',
						null,
						self.props.items[index].item
					)
				));
			}
		});
		console.log(allItems);
		return allItems;
	},
	render: function () {
		var filterToPrint;
		if (this.props.filter === "Active") {
			filterToPrint = this.showActiveItems();
		} else if (this.props.filter === "Completed") {
			filterToPrint = this.showCompletedItems();
		} else if (this.props.filter === "All") {
			filterToPrint = this.showAllItems();
		}
		return React.createElement(
			'div',
			null,
			filterToPrint
		);
	}
});

var TodoFooter = React.createClass({
	displayName: 'TodoFooter',

	shouldComponentUpdate: function (nextProps, nextState) {
		if (this.props.filter === nextProps.filter) return false;
		return true;
	},
	render: function () {
		return React.createElement(
			'div',
			null,
			React.createElement(
				'select',
				{ onChange: this.props.eventToShowList },
				React.createElement(
					'option',
					{ value: 'Active' },
					'Active'
				),
				React.createElement(
					'option',
					{ value: 'Completed' },
					'Completed'
				),
				React.createElement(
					'option',
					{ value: 'All' },
					'All'
				)
			)
		);
	}
});

ReactDOM.render(React.createElement(TodoApp, null), document.getElementById('content'));