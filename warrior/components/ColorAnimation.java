package net.brokenspork.components;

import com.artemis.Component;

public class ColorAnimation extends Component {
	public float redMin, redMax, redSpeed;
	public float greenMin, greenMax, greenSpeed;
	public float blueMin, blueMax, blueSpeed;
	public float alphaMin, alphaMax, alphaSpeed;
	
	public boolean redAnimate, greenAnimate, blueAnimate, alphaAnimate, repeat;
}
