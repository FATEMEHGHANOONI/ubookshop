import Component, { PageEl } from '@/components/Libs/Component';
import Copy from '@/components/Libs/Copy';
import Router from 'next/router'
import Window from '@/components/Libs/Window';
import TextBox from '@/components/Libs/TextBox';
import Icon2Titles from '@/components/Libs/Icon2Titles';
import Icon3Titles from '@/components/Libs/Icon3Titles';
import css from './css.module.css'
import WindowFloat from '../Libs/WindowFloat';
import {Block} from './Block'




// const Block = props=>
// {
//   let book = props.book
//   return <img
//             className={global.styles.hoverzoom_nofade}
//             src = {book.imageLink}
//             style = {{height:200, width:150, objectFit:"fill",flex:1, minWidth:150 }} 
//             onClick={()=>{
//               props.state.form ="bookspecs"
//               props.state.book = book
//               props.refresh()

//             }}/>
          

// }


export default p => Component(p, Page);
const Page: PageEl = (props, state:{
  form:string,
  book:{
  title:string, author:string , country: string,price:number, language: string, pages: number, 
  },
  cart:Array<string>
}, refresh, getProps) => {

  let styles = global.styles
  let name = "Wellcome"
  let total_price = 0
 
    if (!state.cart) {
      state.cart = [];
    }
    console.log("renders:", state.cart)
    for (let title of state.cart) {
      let book = props.books.find(b => b.title == title);
      if (book) {
        total_price += (book.price * 0.8);
      }
    
  }

  return (
    <div style={{ direction: "ltr", minHeight: "11vh", }}>
      <br-x />

      {state.form == "bookspecs"?<WindowFloat title= "Books Information" onclose={()=>{
        delete state.form
        refresh()

      }}>
      
        {/* <pre>{JSON.stringify(state.book,null,2)}</pre> */}
        <f-c>
        <img src="https://cdn.turing.team/research/36/open-book.png" style={{width:20,height:20}}/>
        <sp-3/>
          <f-15>Title :</f-15>
          <sp-2/>
          <f-15>{state.book.title}</f-15>

        </f-c>
        <f-c>
        <img src="https://cdn.turing.team/research/36/writing%20%281%29.png" style={{width:20,height:20}}/>
        <sp-3/>
          <f-15><b>Author :</b></f-15>
          <sp-2/>
          <f-15>{state.book.author}</f-15>

        </f-c>
        <f-c>
        <img src="https://cdn.turing.team/research/36/country.png" style={{width:20,height:20}}/>
        <sp-3/>
          <f-15>Country :</f-15>
          <sp-2/>
          
          <f-15>{state.book.country}</f-15>

        </f-c>
        <f-c>
        <img src="https://cdn.turing.team/research/36/language.png" style={{width:20,height:20}}/>
        <sp-3/>
          <f-15>Language :</f-15>
          <sp-2/>
          <f-15>{state.book.language}</f-15>

        </f-c>
        <f-c>
        <img src="https://cdn.turing.team/research/36/paper.png" style={{width:20,height:20}}/>
        <sp-3/>
          <f-15>Pages :</f-15>
          <sp-2/>
          <f-15>{state.book.pages as number}</f-15>

        </f-c>
        <g-b style={{height:30,width:"calc(100%-20px)",margin:"0 10px",backgroundColor:
         state.cart.includes(state.book.title)?"darkseagreen":"forestgreen",borderRadius:5}}onClick={()=>{
          if(state.cart.includes(state.book.title))
          {
            state.cart = state.cart.filter(bookname=> state.book.title !=bookname)
            state.form = null
            refresh()

          }
          else{
          state.cart.push(state.book.title)
          state.form = null
          refresh()
          }
        }}>
          {state.cart.includes(state.book.title)?<f-13>Remove from cart</f-13>:<f-13>Add to cart</f-13>}
        {/* <img src = "https://cdn.turing.team/research/36/love.png" style={{height:30, width:20, objectFit:"contain"}}/> */}

        </g-b>
      </WindowFloat>:null}
      <Window title="Shopping cart" style={{width:"calc(100%-20px)",margin : 10}}>
        <f-cse style={{width:"100%", height:60}}>
          <f-c><img src="https://cdn.turing.team/research/36/tag.png"  style={{width:25,height:25}}/>
          <f-14>Total Price : {total_price}</f-14>
          </f-c>
          <f-c><img src="https://cdn.turing.team/research/36/stack-of-books.png"  style={{width:25,height:25}}/>
          <f-14>Number of books :{state.cart.length} </f-14>
          </f-c>
        </f-cse>
      </Window>
      <Window title={name} style={{ minHeight: 200, margin: 10, width: "calc(100% - 20px)" }}>
        {/* <pre style={{ direction: "ltr" }}>{JSON.stringify(props, null, 2)}</pre> */}
        <w-cse>
          

          {props.books.map(book=>{
            return <Block
            book= {book}
            state= {state}
            refresh = {refresh} />
            })}
           

        </w-cse>
      </Window>
    </div>
  )
}


export async function getServerSideProps(context) {


  var session = await global.SSRVerify(context)
  var { uid, name, image, imageprop, lang, cchar,
    unit, workspace, servid, servsecret,
    usedquota, quota, quotaunit, status, regdate, expid,
    role, path, devmod, userip, } = session;

    let books= await global.db.collection("books").find({}).toArray()
    for(let book of books){
      book.imageLink="https://cdn.turing.team/research/ex/books/"+book.imageLink
    }
    
    console.log(books)


  return {
    props: {
      data: global.QSON.stringify({
        session,
        books
        // nlangs,
      })
    },
  }
}