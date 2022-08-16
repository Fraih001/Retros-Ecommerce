import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchProducts, fetchCart, exchangeToken, logout } from './store';
import { Link, Route } from 'react-router-dom';
import SignUpContainer from './SignUp/SignUpContainer';
import SignInContainer from './SignIn/SignInContainer';
import Cart from './Cart';



import igdb from 'igdb-api-node';

const client = igdb('71n9jotfv4acipnlmuxyy6btvrik4u', '9y3fegv67pshqedo7s191euhphaztj');



class App extends React.Component{

  componentDidMount(){
    this.props.fetchProducts();
    this.props.exchangeToken();
  }

  componentDidUpdate(prevProps){
    if(!prevProps.auth.id && this.props.auth.id){
      this.props.fetchCart();
    }
  }
  render(){
    const signUpTriggerText = 'Sign Up';
    const signInTriggerText = 'Sign In';
    const { auth, logout, cart, zeldaGames, thisMonthGames1989  } = this.props;
    return (
      <main>

        <header>
        <div class="topnav">
          <a href="home">Home</a>
          <a href="genre">Genre</a>
          <a href="platform">Platform</a>
          <a href="games">Games A-Z</a>
          <a href="popular">Popular</a>
      
        <div class="topnav-right">
          <a href="myaccount">My Account</a>
          {
          auth.id ? <button onClick={ logout }>Logout { auth.username }</button>: <SignInContainer triggerText={signInTriggerText} />
        }
                {
          auth.id ? null : (
              <SignUpContainer triggerText={signUpTriggerText} />
          ) 
        }
          <a href="cart">Cart</a>
          {/* <form class="example" action="/action_page.php" style="margin:auto;max-width:200px;"> */}
            {/* <input type="text" placeholder="Search.." name="search2"> */}
          {/* </form> */}
        </div>
        <div class="footer">
          <a href="instagram">Instagram</a>
          <a href="facebook">Facebook</a>
          <a href="twitter">Twitter</a>
          <a href="contact">Contact</a>
        <div class="footer-right">
          Sources
        </div>
       </div>
       </div>
        </header>

          <h1>LOGO</h1>

        <div class="container">
          <h2>Top 10 Games in 1980</h2>  
          <div id="myCarousel" class="carousel slide" data-ride="carousel">
        
            <ol class="carousel-indicators">
              <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
              <li data-target="#myCarousel" data-slide-to="1"></li>
              <li data-target="#myCarousel" data-slide-to="2"></li>
            </ol>
        
            <div class="carousel-inner">
              <div class="item active">
              { thisMonthGames1989.map(product=>{
          return (
            <li key={product.id}>
               <div class="picture"><img src={product.imageUrl}width="170" 
     height="170" /></div><div class='name'>{product.name}</div> 
            </li>
          )
        }).slice(0,1)}
              </div>
        
              <div class="item">
              Game 2
              </div>
            
              <div class="item">
              Game 3
              </div>
            </div>
        
            <a class="left carousel-control" href="#myCarousel" data-slide="prev">
              <span class="glyphicon glyphicon-chevron-left"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a class="right carousel-control" href="#myCarousel" data-slide="next">
              <span class="glyphicon glyphicon-chevron-right"></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
        </div>

        <div class="recently-released">
          Recently Released 

          <div class="games">
        { zeldaGames.map(product=>{
          return (
            <li key={product.id}>
               <div class="picture"><img src={product.imageUrl}width="170" 
     height="170" /></div><div class='name'>{product.name}</div> 
            </li>
          )
        }).slice(0,5)}
        </div>
        </div>

        <div class="upcoming-releases">
          Upcoming Releases 
         
         
        </div>
        
        <div class="spotlight">
          Spotlight 
        </div>

      



      

        {
          auth.id ? <Link to='/cart'>Cart ({cart.lineItems.length})</Link>: null
        }
        
        {
          auth.id ? (
            <Fragment>
              <Route path='/cart' component={ Cart } />
            </Fragment>
          ): null 
        }

        {auth.id ? (<ul>
        { zeldaGames.map(product=>{
          return (
            <li key={product.id}>
              name: {product.name} <img src={product.imageUrl}/>
            </li>
          )
        })}
        </ul>): null}
       
        
      </main>
    );

  }
}
const mapDispatch = (dispatch)=> {
  return {
    exchangeToken: ()=> dispatch(exchangeToken()),
    logout: ()=> dispatch(logout()),
    fetchCart: ()=> dispatch(fetchCart()),
    fetchProducts: ()=> dispatch(fetchProducts()),

  };
};
const mapStateToProps = ({auth, product, cart}) => {
  const zeldaGames = product.filter(product => product.theme === 'zeldaGames');
  const marioGames = product.filter(product => product.theme === 'marioGames');
  const thisMonthGames1989 = product.filter(product => product.theme === 'thisMonthGames1989');
  const thisYearsGames1985 = product.filter(product => product.theme === 'thisYearsGames1985');
  const thisYearsGames1987 = product.filter(product => product.theme === 'thisYearsGames1987');
  const thisYearsGames1990 = product.filter(product => product.theme === 'thisYearsGames1990');
  const thisYearsGames1992 = product.filter(product => product.theme === 'thisYearsGames1992');
  const thisYearsGames1994 = product.filter(product => product.theme === 'thisYearsGames1994');

    return {
      auth,
      zeldaGames,
      thisMonthGames1989,
      cart
    }
  };

export default connect(mapStateToProps, mapDispatch)(App);
