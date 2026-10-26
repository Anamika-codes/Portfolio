import { Component } from 'react'

export default class HeroErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('Hero error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="hero relative overflow-hidden">
          <div className="shell relative py-20">
            <h1 className="hero__name">Anamika Mukherjee</h1>
            <p className="hero__headline">Full Stack Developer · Machine Learning Enthusiast</p>
            <p className="hero__meta">Prayagraj, India · Open to opportunities</p>
          </div>
        </section>
      )
    }
    return this.props.children
  }
}
