var dragContainer;
function dragStart(element) {
    dragContainer = document.getElementById('drag-container');
    draggedElement = element;
    if (draggedElement.style.left == '') draggedElement.style.left = '20px';
    if (draggedElement.style.top == '') draggedElement.style.top = '20px';
    xOffset = event.pageX - parseInt(draggedElement.style.left);
    yOffset = event.pageY - parseInt(draggedElement.style.top);
    dragContainer.addEventListener('mousemove', drag);
    dragContainer.addEventListener('mouseup', endDrag);
}

function drag(e) {
    draggedElement.style.left = e.pageX - xOffset + 'px';
    draggedElement.style.top = e.pageY - yOffset + 'px';
}

function endDrag() {
    dragContainer.removeEventListener('mousemove', drag);
    dragContainer.removeEventListener('mousemove', endDrag);
}
