const validateLink = (parentPage, urlPath) => {

	const linkTo = "/" + parentPage.split("/").join("") + "/"+ urlPath.split("/").join("");
	return linkTo

}




export default validateLink
