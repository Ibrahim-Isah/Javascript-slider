# A Native Javascript Slider

This is a Native Javascript Slider that can be used in your html code using classnames.

## 💪🏼 Getting Started

If this is your first time getting started. Below is a short guide on how to implement the slider into your code.

### Implementing the slider

```
    <div class="slider autoplay">
		<div class="slide slide-1 active">
            <div>
                Hello test slider
            </div>
        </div>
        <div class="slide slide-2">
            <div>
                Hello test slider
            </div>
        </div>
        <div class="slide slide-3">
            <div>
                Hello test slider
            </div>
        </div>
    </div>
```

The main slider component is made of 3 or 4 main classnames

1. slider -> the slider class is the added to the container element in other to initialize the slider.
2. slide -> the slide is added as a child component to the slider container which indicates that this is a single slide. What ever is contained here would be regarded as the children of the slide
3. active -> the active class is added to the first slide or whatever slide to indicate the starting point of the slider.
4. autoplay -> this is an optional class that can be added to make the slides to automatically start changing within a few seconds.

### Adding the dots and arrows

```
    <div class="buttons">
		<div class="next"> > </div>
		<div class="prev"> < </div>
	</div>
	<div class="dots"></div>
```

Finally, the arrows and dots are finally added using classnames too. The classnames that are added here are specified below

1. buttons class -> this class is added to the container of the arrows. this will enable the slider determine the arrangement and display of the arrows
2. next class -> this will be responsible for the arrow for changing the slide to the next slide. icons and other indicators can be used here.
3. prev class -> this is same as the next class but this takes us to the previous slide
4. dots class -> this is added in other to add the dots for the slides as an indicator
