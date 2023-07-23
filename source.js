const apiKey = '7441ff8f';
const baseUrl = 'http://www.omdbapi.com/';
const movie_list=document.querySelector(".movies_list");
const pagination_list=document.querySelector(".pagination");
let current_page=1;
let allButtons;

const savedData=localStorage.getItem("userData");
const parseData=JSON.parse(savedData);
if(parseData === null)
{
    let comments=[];
    localStorage.setItem("userData",JSON.stringify(comments));
}
async function fetchMovies(searchQuery, page) {
    const url = `${baseUrl}?apikey=${apiKey}&s=${searchQuery}&page=${page}`;
    try {
       
      const response = await fetch(url);
      const data = await response.json();
 
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  }

function create_image(movie,movie_div)
{
    const img_div=document.createElement("div");
    const img=document.createElement("img");
    img.setAttribute("src",`${movie.Poster}`);
    img.setAttribute("class","img_class");
    img_div.appendChild(img);
    movie_div.appendChild(img_div);
         
}
function create_content_div(movie,movie_div)
{
    const content_div=document.createElement("div");
    content_div.setAttribute("class","content_div");
    const title_div=document.createElement("div");
    const review_div=document.createElement("div");
    const rating_div=document.createElement("div");

        const select=document.createElement("select");
        select.id=`${movie.imdbID}rating`;
        const option=document.createElement("option");
        option.value="";
        option.text="Rating";
        select.appendChild(option);
        for (let i = 1; i <= 5; i++) {
            const option = document.createElement("option");
            option.value = i;
            option.innerText = `${i} star`;
            select.appendChild(option);
          }
        
          rating_div.appendChild(select);
        
        select.addEventListener("change",(e)=>{
            
            
            const value=e.target.value;
            
            const savedData=localStorage.getItem("userData");
            const parseData=JSON.parse(savedData);
            
            if(parseData ===null)
            {
                parseData.push({
    
                    imdb : `${movie.imdbID}`,
                    id : 1,
                    rating : value
                })
            }else
            {
                const new_id=parseData.length+1;
                parseData.push({
    
                    imdb : `${movie.imdbID}`,
                    id : new_id,
                    rating : value
                })
            }
            localStorage.removeItem("userData");
        localStorage.setItem("userData",JSON.stringify(parseData));


        })
    
    const comment_div=document.createElement("button");
    comment_div.innerHTML="Comment Here";
    comment_div.id=`${movie.imdbID}comment`;
    const comment_input=document.createElement("input");
    comment_input.type="text";
    comment_input.value="";
    comment_input.id=`${movie.imdbID}input`;

    const comment_input_button=document.createElement("button");
    comment_input_button.type="submit";
    comment_input_button.id=`${movie.imdbID}button`;
    comment_input_button.innerHTML="Add Comment";
    comment_div.addEventListener("click",()=>{

        document.getElementById(`${movie.imdbID}comment`).style.display='none';
        review_div.appendChild(comment_input);
        review_div.appendChild(comment_input_button);

    })
   
    comment_input_button.addEventListener("click",()=>{

        const comment=comment_input.value;
        comment_input.remove();
        comment_input_button.remove();
        document.getElementById(`${movie.imdbID}comment`).style.display='inline';
        const savedData=localStorage.getItem("userData");
        const parseData=JSON.parse(savedData);
        
        if(parseData ===null)
        {
            parseData.push({

                imdb : `${movie.imdbID}`,
                id : 1,
                content : comment
            })
        }else
        {
            const new_id=parseData.length+1;
            parseData.push({

                imdb : `${movie.imdbID}`,
                id : new_id,
                content : comment
            })
        }

        localStorage.removeItem("userData");
        localStorage.setItem("userData",JSON.stringify(parseData));

    });

    review_div.appendChild(rating_div);
    review_div.appendChild(comment_div);
    const movie_details=document.createElement("div");
  
    movie_details.innerHTML="Movie Details";
    

    title_div.innerHTML=`Title: ${movie.Title}`;
   

    content_div.appendChild(title_div);
    content_div.appendChild(review_div);
    content_div.appendChild(movie_details);
    movie_div.appendChild(content_div);
}
function create_movie_description_div(movie,movie_div)
{
    const movie_description=document.createElement("div");
    
}
function displaymovies(movies)
{
     movie_list.innerHTML="";
     movies.forEach((obj) => {
        
        const movie_div=document.createElement("div");
        movie_div.setAttribute("class","movie_div");

        create_image(obj,movie_div);
        create_content_div(obj,movie_div);
        create_movie_description_div(obj,movie_div);

        movie_list.appendChild(movie_div);

    });
  
}
function pagination_working(page,searched_category)
{
           
           
            fetchMovies(`${searched_category}`,page)
            .then((data) =>
                 {
                     if(data && data.Search)
                      {
                         
                         displaymovies(data.Search);
                       
                      }
                })
            
}
function Pagination(total_count, searched_category) {
    const total_count_pages = Math.ceil(total_count/ 10);
     pagination_list.innerHTML = '';
     const left_arrow=create_left_arrow();
     pagination_list.appendChild(left_arrow);
    for (let i = 1; i <= total_count_pages; i++) {

      const button = document.createElement('button');
      button.innerText = i;
      button.setAttribute("id",`${i}button`);
      button.setAttribute("class",`button`);
      button.style.display='none';
      pagination_list.appendChild(button);
      button.addEventListener('click', () => pagination_working(i,searched_category));
     
       
    }
    const right_arrow=create_right_arrow();
    pagination_list.appendChild(right_arrow);
  }

function create_left_arrow(){
    const left_arrow=document.createElement("button")
    left_arrow.type='submit';
    left_arrow.setAttribute("id",'left_arrow');
    left_arrow.setAttribute("class","button");
    left_arrow.innerHTML=` <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    class="bi bi-arrow-left"
    viewBox="0 0 16 16"
  >
    <path
      fill-rule="evenodd"
      d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
    />
  </svg>`
  return left_arrow;
}
function create_right_arrow()
{

    const right_arrow=document.createElement("button")
    right_arrow.type='submit';
    right_arrow.setAttribute("id",'right_arrow');
    right_arrow.setAttribute("class","button");
    right_arrow.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
  </svg>`
 
return right_arrow

}
function display_button()
 {
    
    let start_index=current_page-1;
    const limit=Math.min(start_index+30,allButtons.length);
    
    for(;start_index<limit;start_index++)
    {
    //     const button = document.createElement('button');
    //   button.innerText = allButtons[start_index];
    //   button.setAttribute("id",`${allButtons[start_index]}button`);
    //   button.setAttribute("class",`button`);
    //   pagination_list.appendChild(button);  
    //   button.addEventListener('click', (e) => 
    //   {

    //     const pageno=e.target.id.substring(0,e.target.id.length-6);
    //     pagination_working(pageno,searched_category)

    //   });
    
    // console.log( document.getElementById(`${allButtons[start_index]}button`));
     document.getElementById(`${allButtons[start_index]}button`).style.display="inline";
       
    }

    document.getElementById("left_arrow").addEventListener("click", ()=>{
        current_page--;
        display_button();
      });
      document.getElementById("right_arrow").addEventListener("click", ()=>
      {
        current_page++;
        console.log(current_page);
        display_button();
      });
    
    
}

    

// function dynamic_pagination(total_pages,searched_category)
// {
//     const allButtons = Array.from({ length: total_pages }, (_, index) => index + 1);
//     display_button(allButtons,searched_category);
//       document.getElementById("left_arrow").addEventListener("click", ()=>{
//         current_page--;
//         display_button(allButtons,searched_category)
//       });
//       document.getElementById("right_arrow").addEventListener("click", ()=>
//       {
//         console.log("hi");
//         current_page++;
//         display_button(allButtons,searched_category)
//       });
 
// }


  // Example: Display initial buttons for the first page
//   displayButtons(currentPage);
  
  // Example: Add event listeners to left and right arrows
 

  document.getElementById("search_button").addEventListener("click",(e)=>{

    const searched_category=document.getElementById('input_search').value;
    fetchMovies(`${searched_category}`,1)
    .then((data) =>
    {
        if(data && data.Search)
        {
           
             displaymovies(data.Search);
             allButtons = Array.from({ length: Math.ceil(data.totalResults/10) }, (_, index) => index + 1);
             Pagination(data.totalResults,searched_category);
             display_button();
            //  dynamic_pagination(data.totalResults,searched_category);
        }
        })
  })
  fetchMovies('popular',1)
  .then((data) =>
  {
        if(data && data.Search)
        {
            current_page=1;
             displaymovies(data.Search);
             allButtons = Array.from({ length: Math.ceil(data.totalResults/10) }, (_, index) => index + 1);
              Pagination(data.totalResults,'popular');
              display_button();
            // dynamic_pagination(data.totalResults,'popular');
             
        }
  })
  
