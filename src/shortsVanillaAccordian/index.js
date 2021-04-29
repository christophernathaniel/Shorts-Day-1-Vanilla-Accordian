// * Accordian JavaScript
// * Add class to <ul> Tag
// * Create Standard <li> Listing
// * The first element in the LI is the Tab
// * The second element in the LI is the hidden content

const shortsVanillaAccordian = (params) => {
  // Define Params
  const select = params.selector;
  const getStructuredNodes = select + " li";
  const clickable = select + " li > *:nth-child(1)";
  const openable = select + " li > *:nth-child(2)";
  const openableContent = select + " li > *:nth-child(2) > div";

  // Get the notes.. or not.
  let getNodes = (select) => {
    return document.querySelectorAll(select) || [];
  };

  // Get Adjacent Node
  let getAdjacentNode = (elem) => {
    return elem.nextElementSibling;
  }


  // Takes an array of elements and returns array of heights
  const retrieveCurrentHeights = (elem) => {
    const getHeightsList = Array.from(getNodes(elem)).map((item) => {
     return item.offsetHeight;
    });
    return getHeightsList;
  }

  // Set Default Height
  const openHeights = retrieveCurrentHeights(openableContent);

  window.resize = function() {
    openHeights = retrieveCurrentHeights(openableContent)
  }

  // Find Index
  function indexInParent(node) {
    var children = node.parentNode.childNodes;
    console.log(children);
    var num = 0;
    for (var i=0; i<children.length; i++) {
         if (children[i]==node) return num;
         if (children[i].nodeType==1) num++;
    }
    return -1;
  }

  // Find Global Index

  function indexInGlobal(node, qsa) {
    console.log(node);
    var children = document.querySelectorAll(qsa);
    var num = 0;
    for (var i=0; i<children.length;i++) {
      if(children[i]==node) return num;
      if(children[i].nodeType==1) num++;
    }
  }

  // Handle Add Event
  const accordianAdditionManagement = async (event) => {
    let tgt = event.target;
    let node = getAdjacentNode(tgt);
    tgt.classList.add("active");

    
    node.style.maxHeight = openHeights[indexInGlobal(tgt.parentNode, getStructuredNodes)] + 'px';

    //console.log(indexInGlobal(tgt.parentNode));
    
    return true;
  };

  // Handle Removal Event
  const accordianRemovalManagement = async (event) => {
    getNodes(clickable).forEach(async (el) => {
      if (event.target != el) {
        getAdjacentNode(el).style.maxHeight = "0px";
        el.classList.remove("active");
      }
    });
  };

 
  // * Event Listener Management
  const handleNodeListener = async (node, type, func) => {
    node.addEventListener(
      type,
      (event) => {
        func(event);
      },
      true
    );
  };

  // * Set all heights to 0

  getNodes(openable).forEach((node) => {
    node.style.maxHeight = "0px";
  });

  // * Handle Accordian Loops
  getNodes(clickable).forEach(async (accordian) => {
    handleNodeListener(accordian, "click", accordianRemovalManagement);
    handleNodeListener(accordian, "click", accordianAdditionManagement);
  });
};

export default shortsVanillaAccordian;
