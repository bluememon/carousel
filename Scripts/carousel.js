$(function () {
	/*////////////////////////////////////////////////////////////////////
	///////
	///////               Initial Variables 
	///////               these can be edited
	///////
	///////////////////////////////////////////////////////////////////*/
	
	var automaticTimer = 3000;
	var slideSpeed = 1000;
	
	

	/*////////////////////////////////////////////////////////////////////
	///////
	///////               Automatic Initial Variables 
	///////               these can't be edited ;D
	///////
	///////////////////////////////////////////////////////////////////*/
	var numberOfBanners = $('.bannerWrapper .bannerViewPortWrapper .bannerReel').children().length;
	var initial = 0;
	var slotWidth = 0;
	var horizontalDimentions = parseInt($('#bannerGeneral').css('width'));
	var activeBanner = null;
	
	/*////////////////////////////////////////////////////////////////////
	///////
	///////               Function Creation
	///////
	///////////////////////////////////////////////////////////////////*/
	function calculateDimentions ()
	{
		slotWidth = parseInt($('.bannerWrapper .bannerViewPortWrapper').css('width'));
		
		$('.bannerWrapper .bannerViewPortWrapper .bannerReel').css('width', (slotWidth * numberOfBanners));
		$('.bannerWrapper .bannerViewPortWrapper .bannerReel .bannerSlot').css('width', slotWidth);
		
		if (activeBanner != null)
		{
			moveTo(parseInt((slotWidth * activeBanner) * -1));
		}
	}
	
	function moveTo(positionX)
	{
		$('.bannerWrapper .bannerViewPortWrapper .bannerReel').animate({ left: parseInt(positionX) }, slideSpeed)
	}
	
	function animateCarousel()
	{
		var x = (slotWidth * -1);
		activeBanner = 0;
				
		initiate = setInterval(function(){
			
			x = ((slotWidth * activeBanner) * -1);
			
			addHighlight($('.bannerWrapper .bannerThumbnailsWrapper .thumbnailReel .thumbnailSlot:nth-child(' + parseInt(activeBanner + 1) +')'));
			
			moveTo(x);
			activeBanner++;
			
			if (activeBanner >= numberOfBanners)
			{
				activeBanner = 0;
			}
			
			if (x <= ((slotWidth * numberOfBanners) * -1))
			{
				x = 0;
			}
		}, automaticTimer);
	}
	
	function stopCarousel()
	{
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
	calculateDimentions();
	
	$('.bannerWrapper .bannerThumbnailsWrapper .thumbnailReel .thumbnailSlot').each(function(index)
	{
		$(this).bind("click", function(){
			stopCarousel();
			addHighlight($(this))
			
			moveTo(parseInt((initial + (slotWidth * index)) * -1));
			activeBanner = index;
		});
	});
	
	$(window).resize(function () {
		if (initiate)
		{
			clearInterval(initiate);
			calculateDimentions();
		}
		else
		{
			calculateDimentions();
		}
		
	});
	
	animateCarousel();
});