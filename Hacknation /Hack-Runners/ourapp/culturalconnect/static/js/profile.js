// profile.js

let profilepage= document.querySelector(".profile-page-inner");
let postbutton= document.querySelector(".postbutton");
let activitiesbutton= document.querySelector(".activitiesbutton");
let achievementsbutton= document.querySelector(".achievementsbutton");

let posts = `<div id="img1" class="image-wrapper flexbox">
			<div id="iov1" class="img-overlay-wrapper">
				<div class="img-btns">
					<p>465 <i class="uil uil-heart-alt"></i></p>
				</div>
				<div class="img-overlay"></div>
			</div>
			<img src="facdee69ea0b65ff0e8b75054e019d3e.jpg" alt="">
		</div>
		<div id="img2" class="image-wrapper flexbox">
			<div id="iov2" class="img-overlay-wrapper">
				<div class="img-btns">
					<p>751 <i class="uil uil-heart-alt"></i></p>
				</div>
				<div class="img-overlay"></div>
			</div>
			<img src="0daf540d4852d2dbf9662fed84604c45.jpg" alt="">
		</div>
		<div id="img3" class="image-wrapper flexbox">
			<div id="iov3" class="img-overlay-wrapper">
				<div class="img-btns">
					<p>888 <i class="uil uil-heart-alt"></i></p>
				</div>
				<div class="img-overlay"></div>
			</div>
			<img src="e36c63f02210f93b85a94dc942fa1d5d.jpg" alt="">
		</div>
		<div id="img4" class="image-wrapper flexbox">
			<div id="iov4" class="img-overlay-wrapper">
				<div class="img-btns">
					<p>1 015 <i class="uil uil-heart-alt"></i></p>
				</div>
				<div class="img-overlay"></div>
			</div>
			<img src="1d7e05fabea82487d07f98f435de1d21.jpg" alt="">
		</div>
		<div id="img5" class="image-wrapper flexbox">
			<div id="iov5" class="img-overlay-wrapper">
				<div class="img-btns">
					<p>1 669 <i class="uil uil-heart-alt"></i></p>
				</div>
				<div class="img-overlay"></div>
			</div>
			<img src="92b9d4aeeba0b08152e59430440ddb9b.jpg" alt="">
		</div>
		<div id="img6" class="image-wrapper flexbox">
			<div id="iov6" class="img-overlay-wrapper">
				<div class="img-btns">
					<p>986 <i class="uil uil-heart-alt"></i></p>
				</div>
				<div class="img-overlay"></div>
			</div>
			<img src="472f4a68147a8bcc1fca59e06a31af02.jpg" alt="">
		</div>
`
let activities=`<div id="img7" class="image-wrapper flexbox">
<div id="iov7" class="img-overlay-wrapper">
    <!-- <div class="img-btns">
      <p>707 <i class="uil uil-heart-alt"></i> &nbsp&nbsp 92 <i class="uil uil-comment"></i></p>
    </div> -->
    <div class="img-overlay"></div>
</div>
<img src="d8e6950b666190aff55736ca6ba3528e.jpg" alt="">
</div>
<div id="img8" class="image-wrapper flexbox">
<div id="iov8" class="img-overlay-wrapper">
    <!-- <div class="img-btns">
      <p>1 465 <i class="uil uil-heart-alt"></i> &nbsp&nbsp 340 <i class="uil uil-comment"></i></p>
    </div> -->
    <div class="img-overlay"></div>
</div>
<img src="d66676b225d739f5c9efb198aaf37fdd.jpg" alt="">
</div>
<div id="img9" class="image-wrapper flexbox">
<div id="iov9" class="img-overlay-wrapper">
    <!-- <div class="img-btns">
      <p>2 002 <i class="uil uil-heart-alt"></i> &nbsp&nbsp 548 <i class="uil uil-comment"></i></p>
    </div> -->
    <div class="img-overlay"></div>
</div>
<img src="01247305bd1f1dd27f1b24cdf78ac61a.jpg" alt="">
</div>`

let achievements=`<div id="img10" class="image-wrapper flexbox">
<div id="iov10" class="img-overlay-wrapper">
    <div class="img-btns">
      <p> Cryptic</p>
    </div>
    <div class="img-overlay"></div>
</div>
<img src="3285494.png" alt="">
</div>
<div id="img11" class="image-wrapper flexbox">
<div id="iov11" class="img-overlay-wrapper">
    <div class="img-btns">
      <p>Antique Collector</p>
    </div>
    <div class="img-overlay"></div>
</div>
<img src="3791606.png" alt="">
</div>
<div id="img12" class="image-wrapper flexbox">
<div id="iov12" class="img-overlay-wrapper">
    <div class="img-btns">
      <p>Young</p>
    </div>
    <div class="img-overlay"></div>
</div>
<img src="9449725.png" alt="">
</div>
</div>
</div>`
// navbar button
let navBtn = $('#nav-button');

navBtn.click(function() {
    if(navBtn.hasClass('open')) {
        navBtn.toggleClass('open');
        // navBtn.css("transform", "rotate(0deg)");
    } else {
        navBtn.toggleClass('open');
        // navBtn.css("transform", "rotate(90deg)");
    }
});

// navbar profile picture wrapper
let profilePicture = $(".profile-picture");
let dmenu = $("#dropdownmenu");

profilePicture.click(function() {

    if(dmenu.hasClass('open')) {
        dmenu.toggleClass('open');
        dmenu.css("display", "none");
    } else {
        dmenu.toggleClass('open');
        dmenu.css("display", "block");
    }

});



let profilePicWrapper = $(".profile-pic-wrapper");
let profilePicNote = $(".profile-pic-note");
profilePicWrapper.on({
    mouseenter: function () {
        profilePicNote.css("top", "110%");
        profilePicNote.css("opacity", "1");
    },
    mouseleave: function () {
        profilePicNote.css("top", "105%");
        profilePicNote.css("opacity", "0");
    }
});

let profileHeaderWrapper = $(".profile-header-img-wrapper");
let profileHeaderNote = $(".profile-header-note");
profileHeaderWrapper.on({
    mouseenter: function () {
        profileHeaderNote.css("top", "110%");
        profileHeaderNote.css("opacity", "1");
    },
    mouseleave: function () {
        profileHeaderNote.css("top", "105%");
        profileHeaderNote.css("opacity", "0");
    }
});




$("#img1").on({
    mouseenter: function () {
        $("#iov1").css("opacity", "1");
    },
    mouseleave: function () {
        $("#iov1").css("opacity", "0");
    }
});
$("#img2").on({
    mouseenter: function () {
        $("#iov2").css("opacity", "1");
    },
    mouseleave: function () {
        $("#iov2").css("opacity", "0");
    }
});
$("#img3").on({
    mouseenter: function () {
        $("#iov3").css("opacity", "1");
    },
    mouseleave: function () {
        $("#iov3").css("opacity", "0");
    }
});
$("#img4").on({
    mouseenter: function () {
        $("#iov4").css("opacity", "1");
    },
    mouseleave: function () {
        $("#iov4").css("opacity", "0");
    }
});
$("#img5").on({
    mouseenter: function () {
        $("#iov5").css("opacity", "1");
    },
    mouseleave: function () {
        $("#iov5").css("opacity", "0");
    }
});
$("#img6").on({
    mouseenter: function () {
        $("#iov6").css("opacity", "1");
    },
    mouseleave: function () {
        $("#iov6").css("opacity", "0");
    }
});
$("#img7").on({
    mouseenter: function () {
        $("#iov7").css("opacity", "1");
    },
    mouseleave: function () {
        $("#iov7").css("opacity", "0");
    }
});
$("#img8").on({
    mouseenter: function () {
        $("#iov8").css("opacity", "1");
    },
    mouseleave: function () {
        $("#iov8").css("opacity", "0");
    }
});
$("#img9").on({
    mouseenter: function () {
        $("#iov9").css("opacity", "1");
    },
    mouseleave: function () {
        $("#iov9").css("opacity", "0");
    }
});
$("#img10").on({
    mouseenter: function () {
        $("#iov10").css("opacity", "1");
    },
    mouseleave: function () {
        $("#iov10").css("opacity", "0");
    }
});
$("#img11").on({
    mouseenter: function () {
        $("#iov11").css("opacity", "1");
    },
    mouseleave: function () {
        $("#iov11").css("opacity", "0");
    }
});
$("#img12").on({
    mouseenter: function () {
        $("#iov12").css("opacity", "1");
    },
    mouseleave: function () {
        $("#iov12").css("opacity", "0");
    }
});


$("#switch").on('click', function () {
  if ($("body").hasClass("light")) {
    $("body").removeClass("light");
    $("#switch").removeClass("switched");
    $("#switch a").html('<i class="uil uil-sunset"></i> Light Mode');
  }
  else {
    $("body").addClass("light");
    $(".switch").addClass("switched");
    $("#switch a").html('<i class="uil uil-moonset"></i> Dark Mode');
  }
});

profilepage.innerHTML=posts
$("#img1").on({
    mouseenter: function () {
        $("#iov1").css("opacity", "1");
    },
    mouseleave: function () {
        $("#iov1").css("opacity", "0");
    }
});
$("#img2").on({
    mouseenter: function () {
        $("#iov2").css("opacity", "1");
    },
    mouseleave: function () {
        $("#iov2").css("opacity", "0");
    }
});
$("#img3").on({
    mouseenter: function () {
        $("#iov3").css("opacity", "1");
    },
    mouseleave: function () {
        $("#iov3").css("opacity", "0");
    }
});
$("#img4").on({
    mouseenter: function () {
        $("#iov4").css("opacity", "1");
    },
    mouseleave: function () {
        $("#iov4").css("opacity", "0");
    }
});
$("#img5").on({
    mouseenter: function () {
        $("#iov5").css("opacity", "1");
    },
    mouseleave: function () {
        $("#iov5").css("opacity", "0");
    }
});
$("#img6").on({
    mouseenter: function () {
        $("#iov6").css("opacity", "1");
    },
    mouseleave: function () {
        $("#iov6").css("opacity", "0");
    }
});

postbutton.addEventListener("click",() => {
    profilepage.innerHTML=posts
    $("#img1").on({
        mouseenter: function () {
            $("#iov1").css("opacity", "1");
        },
        mouseleave: function () {
            $("#iov1").css("opacity", "0");
        }
    });
    $("#img2").on({
        mouseenter: function () {
            $("#iov2").css("opacity", "1");
        },
        mouseleave: function () {
            $("#iov2").css("opacity", "0");
        }
    });
    $("#img3").on({
        mouseenter: function () {
            $("#iov3").css("opacity", "1");
        },
        mouseleave: function () {
            $("#iov3").css("opacity", "0");
        }
    });
    $("#img4").on({
        mouseenter: function () {
            $("#iov4").css("opacity", "1");
        },
        mouseleave: function () {
            $("#iov4").css("opacity", "0");
        }
    });
    $("#img5").on({
        mouseenter: function () {
            $("#iov5").css("opacity", "1");
        },
        mouseleave: function () {
            $("#iov5").css("opacity", "0");
        }
    });
    $("#img6").on({
        mouseenter: function () {
            $("#iov6").css("opacity", "1");
        },
        mouseleave: function () {
            $("#iov6").css("opacity", "0");
        }
    });
});
activitiesbutton.addEventListener("click",() => {
    profilepage.innerHTML=activities
    $("#img7").on({
        mouseenter: function () {
            $("#iov7").css("opacity", "1");
        },
        mouseleave: function () {
            $("#iov7").css("opacity", "0");
        }
    });
    $("#img8").on({
        mouseenter: function () {
            $("#iov8").css("opacity", "1");
        },
        mouseleave: function () {
            $("#iov8").css("opacity", "0");
        }
    });
    $("#img9").on({
        mouseenter: function () {
            $("#iov9").css("opacity", "1");
        },
        mouseleave: function () {
            $("#iov9").css("opacity", "0");
        }
    });
});
achievementsbutton.addEventListener("click",() => {
    profilepage.innerHTML=achievements
    $("#img10").on({
        mouseenter: function () {
            $("#iov10").css("opacity", "1");
        },
        mouseleave: function () {
            $("#iov10").css("opacity", "0");
        }
    });
    $("#img11").on({
        mouseenter: function () {
            $("#iov11").css("opacity", "1");
        },
        mouseleave: function () {
            $("#iov11").css("opacity", "0");
        }
    });
    $("#img12").on({
        mouseenter: function () {
            $("#iov12").css("opacity", "1");
        },
        mouseleave: function () {
            $("#iov12").css("opacity", "0");
        }
    });
});