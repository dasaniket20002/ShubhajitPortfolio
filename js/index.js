var img_elements = [];
const num_images = 5;
let image_index = 0;

async function loadImages() {
    const response = await fetch('assets/db/photos.json')
    const json = await response.json()

    console.log(json.length + ' images found')

    var random_arr = [];
    while (true) {
        let random_no = Math.floor(Math.random() * json.length)
        if (!random_arr.includes(random_no)) random_arr.push(random_no);

        if (random_arr.length >= num_images) break;
    }

    var image_files = [];
    random_arr.forEach((i) => {
        let img_obj = json[i];
        let img_path = img_obj.category + '/' + img_obj.img_name;
        image_files.push(img_path);
    })

    const image_container = document.getElementsByClassName('photo-gallery')[0];
    const path_to_image = "assets/categoryData/";

    console.log('image files: ')
    image_files.forEach(img_file_name => {
        let img_element = document.createElement('img');
        image_container.appendChild(img_element);
        img_element.src = path_to_image + img_file_name;

        console.log(img_element.src)

        img_elements.push(img_element);
    });
    img_elements[0].classList.add('active');

    setInterval(change_image, 5000);
}

function change_image() {
    toggle_image();
    increment_index();
    setTimeout(toggle_image, 500);
}
function toggle_image() {
    img_elements[image_index].classList.toggle('active');
}
function increment_index() {
    image_index += 1;
    image_index %= num_images;
}

loadImages();