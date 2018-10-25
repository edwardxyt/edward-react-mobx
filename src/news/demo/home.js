import React from "react";
import { observer, inject } from "mobx-react";

@inject("clickTimes")
@observer
class Home extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {}
    _addHandle(num) {
        this.props.clickTimes.click(1);
    }
    render() {
        return (
            <div>
                这里是Home
                <div
                    onClick={() => {
                        this._addHandle(1);
                    }}
                >
                    点击次数：{this.props.clickTimes.times}
                </div>
                <p>点击10次数：{this.props.clickTimes.total}</p>
                <p>获取IDS：{this.props.clickTimes.getId}</p>
            </div>
        );
    }
}

export default Home;
