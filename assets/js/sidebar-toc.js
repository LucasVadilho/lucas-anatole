// document.getElementById("sidebar").appendChild(document.getElementById("TOC"));
// document.getElementById("TOC").className = "sidebar";
// console.log(3);
// $("#TOC").addClass("sidebar")
// $(".post-title").addClass("sidebar")
// document.getElementById("")
//     console.log(document.readyState);

document.onreadystatechange = function() {
    if(document.readyState !== "loading") { 
        // Move TOC from blogdown to middle-sidebar div
        let toc = document.getElementById("TOC");

        if(toc !== null){
            toc.prepend(document.getElementById("title-toc"));
            
            document.getElementById("middle-sidebar").appendChild(document.getElementById("TOC"));

            let lis = document.querySelectorAll("#TOC a");
            if(lis.length > 0) {
                lis.forEach((li) => {
                    li.addEventListener("click", () => {
                        let old = document.querySelector("#TOC .active");
                        if(old !== null) old.className = "";
                        li.className = "active";
                    });
                });
            }
        } else {
            // TOC from Hugo
            let lis = document.querySelectorAll("#TableOfContents a");
            
            if(lis.length > 0) {
                lis.forEach((li) => {
                    li.addEventListener("click", () => {
                        let old = document.querySelector("#TableOfContents .active");
                        if(old !== null) old.className = "";
                        li.className = "active";
                    });
                });
            }
        }
    }
}

// }
// if(document.readyState !== 'loading') {
//     console.log(3);
//     document.getElementById("sidebar").appendChild(document.getElementById("TOC"));
// }

// while(document.getElementById("sidebar-toc") == null){
//     console.log(3);
//     document.getElementById("sidebar-toc").appendChild(document.getElementById("TOC"));
// }