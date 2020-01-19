import React from 'react';

class Screen extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        // TODO appStatus に応じて表示画像の変更
        // if (this.props.appStatus == '0') {
        //
        // }
      return  (
          <div className="screen">
              <img src="https://placehold.jp/430x200.png" title="dummy"/>
          </div>
      );
    };
};
export default Screen;