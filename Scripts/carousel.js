$(function () {
	/* Initial Variables */
	var automaticTimer = 3000;
	var slideSpeed = 1000;


	var slotWidth = parseInt($('.bannerWrapper .bannerViewPortWrapper').css('width'));
	var numberOfBanners = $('.bannerWrapper .bannerViewPortWrapper .bannerReel').children().length;
	
	$('.bannerWrapper .bannerViewPortWrapper .bannerReel').css('width', (slotWidth * numberOfBanners));
	$('.bannerWrapper .bannerViewPortWrapper .bannerReel .bannerSlot').css('width', slotWidth);
	
	var initial = 0;
	
	function moveTo(positionX)
	{
		$('.bannerWrapper .bannerViewPortWrapper .bannerReel').animate({ left: parseInt(positionX) }, slideSpeed)
	}
	
	var initiate = null;
	
	function animateCarousel()
	{
		var x = (slotWidth * -1);
		var thumbnailCounter = 1;
		
		initiate = setInterval(function(){
		
			thumbnailCounter++;
			addHighlight($('.bannerWrapper .bannerThumbnailsWrapper .thumbnailReel .thumbnailSlot:nth-child(' + thumbnailCounter +')'));
			
			moveTo(x);
			
			x -= slotWidth;
			
			if (thumbnailCounter >= numberOfBanners)
			{
				thumbnailCounter = 0;
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
	
	$('.bannerWrapper .bannerThumbnailsWrapper .thumbnailReel .thumbnailSlot').each(function(index)
	{
		$(this).bind("click", function(){
			stopCarousel();
			addHighlight($(this))
			
			moveTo(parseInt((initial + (slotWidth * index)) * -1));
		});
	});
	
	animateCarousel();
});