import React, { Component } from 'react'
import Navbar from './components/ui/Navbar'
import Routes from './routes'
import { MuiThemeProvider } from 'material-ui/styles';
import theme from './styles/theme'

class App extends Component {

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <Navbar />
          <Routes />
        </div>
      </MuiThemeProvider>

    )
  }
}

export default App
