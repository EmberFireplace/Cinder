<script>
    let transformVar = 'translateX(0%)';
    let on = false;
    function handleClick() {
        on = !on;
        transformVar = on ? 'translateX(40%)' : 'translateX(0%)';
    }
</script>
<div class="hexagon-button" on:click={() => handleClick()}>
    <svg width="102" height="48" viewBox="0 0 102 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="Frame 1">
            <g id="Polygon2">
                <path id="Polygon1" d="M16.908 7.6089C17.4256 6.61984 18.4496 6 19.5659 6H80.4341C81.5504 6 82.5744 6.61984 83.092 7.6089L92.2816 25.1673C92.7323 26.0284 92.7378 27.0545 92.2966 27.9204L84.4284 43.362C83.9162 44.3672 82.8835 45 81.7554 45H19.4746C18.4068 45 17.4195 44.4324 16.8821 43.5097L7.83408 27.9723C7.315 27.0809 7.29026 25.9854 7.76857 25.0715L16.908 7.6089Z" fill="#C4C4C4"/>
                <path id="Polygon2_2" d="M19.696 12.4062C20.2447 11.5312 21.2048 11 22.2376 11H38.1661C39.2215 11 40.1993 11.5546 40.7409 12.4604L48.0284 24.6484C48.622 25.6411 48.592 26.8866 47.9513 27.8497L40.758 38.6617C40.2018 39.4977 39.2643 40 38.2603 40H22.1427C21.1621 40 20.2435 39.5208 19.6824 38.7167L12.1362 27.9017C11.4473 26.9144 11.4153 25.611 12.0549 24.5912L19.696 12.4062Z"
                      fill="#AF5F56" style="--transform-amount: {transformVar}"/>
            </g>
        </g>
    </svg>
</div>
<style>
    #Polygon2_2 {
        --transform-amount: translateX(0%);
        transition: all 0.3s ease;
        transform: var(--transform-amount);
    }
</style>