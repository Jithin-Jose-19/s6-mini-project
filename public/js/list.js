const listViewButton = document.querySelector(".list-view-button");
const gridViewButton = document.querySelector(".grid-view-button");
const list = document.querySelector("ol");

const listItems = document.querySelectorAll("li");
listItems.forEach((listItem) => {
  listItem.addEventListener("click", (e) => {
    console.log(e.target);
    const nodes = siblings(e.target);
    nodes.forEach(li => {
      li.innerHTML = ""
    });
    document.getElementById("myForm").submit();
  });
});

const siblings = (elem) => {
  // create an empty array
  let siblings = [];

  // if no parent, return empty list
  if (!elem.parentNode) {
      return siblings;
  }

  // first child of the parent node
  let sibling = elem.parentNode.firstElementChild;

  // loop through next siblings until `null`
  do {
      // push sibling to array
      if (sibling != elem) {
          siblings.push(sibling);
      }
  } while (sibling = sibling.nextElementSibling);
  
  return siblings;
};

listViewButton.onclick = function () {
  list.classList.remove("grid-view-filter");
  list.classList.add("list-view-filter");
};

gridViewButton.onclick = function () {
  list.classList.remove("list-view-filter");
  list.classList.add("grid-view-filter");
};
