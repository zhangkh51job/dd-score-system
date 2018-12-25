import React, {Component} from 'react'


class CountUp extends Component {

  constructor() {
    super();
    this.state = {
      value: ''
    }
  }

  // 获取新的数据 重新调用
  componentWillReceiveProps(props) {
    this.clearTimer();
    this.setTimer();
  }

  componentDidMount() {
    this.setTimer();
  }

  setTimer = () => {
    if (this.timer) {
      return;
    }
    let now = new Date().getTime();
    this.timer = setInterval(() => {
      const t = new Date().getTime() - now;
      const b = 0;
      const c = Math.ceil(this.props.count);
      const d = this.props.duration;
      let result;
      if (t < this.props.duration) {
        result = this.countUp(t, b, c, d);
      } else {
        result = this.formatNumber(this.props.count, 0, false);
        this.clearTimer();
      }
      this.setState({value: result});
    }, 10);
  }

  formatNumber(number, decimals, useGroup) {
    let str = parseFloat(number).toFixed(decimals);
    if (useGroup) {
      if (number < 0) { // 数字小于0
        str = str.substring(1, str.length);
      }
      let array1 = str.split('.')[0].split('').reverse().join('');
      array1 = array1.replace(/(\d{3})(?=[^$])/g, '$1,');
      array1 = array1.split('').reverse().join('');

      if (decimals >= 1) {
        const array2 = str.split('.')[1];
        str = `${array1}.${array2}`;
      } else {
        str = array1;
      }
      if (number < 0) {
        str = `-${str}`;
      }
    }
    return str;
  }

  countUp = (t, b, c, d) => {
    let result = parseFloat(((c * (-(2 ** ((-10 * t) / d)) + 1) * 1024) / 1023) + b);
    result = this.formatNumber(result, 0, false);
    return result;
  }

  clearTimer = () => {
    clearInterval(this.timer);
    this.timer = null;
  }

  render() {
    let {value} = this.props;
    return (
      <span>{this.state.value}</span>
    )
  }
}

export default CountUp;