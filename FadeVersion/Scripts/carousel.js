$(function () {
	/*////////////////////////////////////////////////////////////////////
	///////
	///////               Initial Variables 
	///////               these can be edited
	///////
	///////////////////////////////////////////////////////////////////*/
	
	var automaticTimer = 3000;
	var slideSpeed = 500;
	
	

	/*////////////////////////////////////////////////////////////////////
	///////
	///////               Automatic Initial Variables 
	///////               these can't be edited ;D
	///////
	///////////////////////////////////////////////////////////////////*/
	var numberOfBanners = $('.bannerWrapper .bannerViewPortWrapper .bannerReel').children().length;
	var initial = 0;
	var activeBanner = 0;
	var animated = false;
	
	/*////////////////////////////////////////////////////////////////////
	///////
	///////               Function Creation
	///////
	///////////////////////////////////////////////////////////////////*/
	function arrangeSlides()
	{
		$('.bannerWrapper .bannerViewPortWrapper .bannerReel').each( function (index) { 
			$(this).css("z-index", parseInt(1));
		});	
		
		$('.bannerWrapper .bannerViewPortWrapper .bannerReel:first-child').css("z-index", parseInt(2));
	}
	
	function showBanner(slideNumber)
	{	
		if (slideNumber != activeBanner)
		{
			actualBanner = activeBanner;
			activeBanner = slideNumber;
			
			$('.bannerWrapper .bannerViewPortWrapper .bannerReel:nth-child('+ parseInt(actualBanner + 1) +')').css("z-index", parseInt(2))
			
			$targetBanner = $('.bannerWrapper .bannerViewPortWrapper .bannerReel:nth-child('+ parseInt(slideNumber + 1) +')');
			
			$targetBanner.css("display", "none");
			$targetBanner.css("z-index", parseInt(3));
			$targetBanner.fadeIn(slideSpeed, function() {
				$('.bannerWrapper .bannerViewPortWrapper .bannerReel').each( function (index) { 
					if (index != slideNumber)
					{
						$('.bannerWrapper .bannerViewPortWrapper .bannerReel:nth-child('+ parseInt(index + 1) +')').css("z-index", parseInt(1));
					}
				});
			});
		}
	}
	
	function animateCarousel()
	{
		animated = true;
		currentActiveBanner = 0;
				
		initiate = setInterval(function(){
						
			addHighlight($('.bannerWrapper .bannerThumbnailsWrapper .thumbnailReel .thumbnailSlot:nth-child(' + parseInt(currentActiveBanner + 1) +')'));
			
			showBanner(currentActiveBanner);
			currentActiveBanner++;
			
			if (currentActiveBanner >= numberOfBanners)
			{
				currentActiveBanner = 0;
			}
		}, automaticTimer);
	}
	
	function stopCarousel()
	{
		animated = false;
		clearInterval(initiate);
	}
	
	function addHighlight(element)
	{
		clearHighlights();
		$(element).addClass("selected");
	}
	
	function clearHighlights()
	{
		$('.bannerWrapper .bannerThumbnailsWrapper .thumbnailReel .thumbnailSlot').each(function(index)
		{
			$(this).removeClass("selected");
		});
	}
	
	
	/*////////////////////////////////////////////////////////////////////
	///////
	///////               Now to initiate the carousel
	///////
	///////////////////////////////////////////////////////////////////*/
	arrangeSlides();
	
	$('.bannerWrapper .bannerThumbnailsWrapper .thumbnailReel .thumbnailSlot').each(function(index)
	{
		$(this).bind("click", function(){
			stopCarousel();
			addHighlight($(this))
			
			showBanner(index);
			activeBanner = index;
			console.log("thumbnail: " + index);
		});
	});
	
	animateCarousel();	
});