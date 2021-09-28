function getText() {
	let text = document.getElementById('encrypted_text').value;
	let full_output;
	let msg_arr = text.split('');
	document.getElementById('newOutput').value = '';

	//console.log(text);
	//console.log(msg_arr);

	let mode = document.getElementById('eng');
	if (mode.checked) {
		mode = 'english';
	} else {
		mode = 'ukrainian';
	}

	//console.log(mode);
	//console.log('Crypt');
	msg_arr = crypt(msg_arr, mode);
	full_output = preparePrintText(msg_arr, 'Crypt:');
	console.log(msg_arr);
	//bruteForce(msg_arr);
	//console.log('Encrypt');
	msg_arr = encrypt(msg_arr, mode);
	full_output += preparePrintText(msg_arr, '\nEncrypt:');
	printText(full_output);
	console.log(msg_arr);
	//printText(msg_arr, mode);
}

function preparePrintText(msg_arr = [], mode = '') {
	//document.getElementById('text-area').innerHTML = '';
	//document.getElementById("output").innerHTML = mode;
	//mode = "New String";
	//document.getElementById("newOutput").value = "";
	let fulltext = mode + '\n';
	msg_arr.forEach((item) => fulltext += item);
	return fulltext;
	//document.getElementById('newOutput').value = fulltext;
	//document.getElementById('output').insertAdjacentHTML('beforeend', '<p>Word:</p>');
	//document.getElementById("out").innerHTML = mode;
	/*msg_arr.forEach((item) =>
		document
			.getElementById('output')
			.insertAdjacentHTML('beforeend', `${item}`)
	);*/
	/*document
		.getElementById('output')
		.insertAdjacentHTML('beforeend', `<br><br>`);*/
}

function printText(fullText = '') {
	document.getElementById('newOutput').value = fullText;
}

function translateTextEn(character) {
	let i = 0;
	while (character !== abc_en[i]) {
		i++;
	}
	//console.log(abc.length);
	return i;
}

function translateTextEnBack(i) {
	return abc_en[i];
}

function translateTextUa(character) {
	let i = 0;
	while (character !== abc_ua[i]) {
		i++;
	}
	//console.log(abc.length);
	return i;
}

function translateTextUaBack(i) {
	return abc_ua[i];
}

function crypt(msg_arr = [], mode) {
	const k = parseInt(document.getElementById('k-cry').value);
	let n, x, y;
	if (mode === 'english') {
		msg_arr.forEach((item, i) => {
				n = abc_en.length;
				x = translateTextEn(msg_arr[i]);
				y = (x + k) % n;
				msg_arr[i] = translateTextEnBack(y);
			}
		);
	} else {
		msg_arr.forEach((item, i) => {
				n = abc_ua.length;
				x = translateTextUa(msg_arr[i]);
				y = (x + k) % n;
				msg_arr[i] = translateTextUaBack(y);
			}
		);
	}
	//console.log(msg_arr);

	return msg_arr;
}

function encrypt(msg_arr = [], mode, i) {
	let k;
	if (i === undefined) {
		k = parseInt(document.getElementById('k-cry').value);
	} else {
		k = i;
	}
	let n, x, y;
	if (mode === 'english') {
		msg_arr.forEach((item, i) => {
				n = abc_en.length;
				y = translateTextEn(msg_arr[i]);
				x = (y + n - (k % n)) % n;
				msg_arr[i] = translateTextEnBack(x);
			}
		);
	} else {
		msg_arr.forEach((item, i) => {
				n = abc_ua.length;
				y = translateTextUa(msg_arr[i]);
				x = (y + n - (k % n)) % n;
				msg_arr[i] = translateTextUaBack(x);
			}
		);
		//console.log(msg_arr);
	}
	//console.log(msg_arr);

	return msg_arr;
}

function bruteForce() {
	let k = document.getElementById('k-num').value;
	let text = document.getElementById('encrypted_text').value;
	let msg_arr = text.split('');
	let full_text = '';
	let num_k = '';
	console.log(k);
	console.log(msg_arr);
	let mode = document.getElementById('eng');
	if (mode.checked) {
		mode = 'english';
	} else {
		mode = 'ukrainian';
	}
	let i = 1;
	while (i <= k) {
		msg_arr = encrypt(msg_arr, mode, 1);
		num_k = 'k = ' + i;
		full_text += num_k + '\t';
		msg_arr.forEach((item) => full_text += item);
		full_text += '\n';
		i++;
	}
	printText(full_text);
}

/*function saveStaticDataToFile() {
	let text = document.getElementById('encrypted_text').value;
	let blob = new Blob([text],
		{type: 'text/plain;charset=utf-8'});
	saveAs(blob, 'static.txt');
}

document.getElementById('input_file')
	.addEventListener('change', function () {
		let fr = new FileReader();
		fr.onload = function () {
			document.getElementById('output').textContent = fr.result.toString();
		}
		fr.readAsText(this.files[0]);
	})*/
let abc_en = [' ', '!', '"', '#', '$', '%', '&', '`', '(', ')', '*', '+', ',', '-', '.', '/', '0', '1', '2', '3', '4',
	'5', '6', '7', '8', '9', '0', ':', ';', '<', '=', '>', '?', '@', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
	'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '[', '\\', ']', '^', '_', '\'',
	'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w',
	'x', 'y', 'z', '{', '|', '}', '~'];
let abc_ua = [' ', '!', '"', '#', '$', '%', '&', '`', '(', ')', '*', '+', ',', '-', '.', '/', '0', '1', '2', '3', '4',
	'5', '6', '7', '8', '9', '0', ':', ';', '<', '=', '>', '?', '@', 'А', 'Б', 'В', 'Г', 'Ґ', 'Д', 'Е', 'Є', 'Ж',
	'З', 'И', 'І', 'Й', 'Ї', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ь',
	'Ю', 'Я', '[', '\\', ']', '^', '_', '\'', 'а', 'б', 'в', 'г', 'ґ', 'д', 'е', 'є', 'ж', 'з', 'и', 'і', 'й', 'к',
	'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ь', 'ю', 'я', '{', '|', '}', '~'];
