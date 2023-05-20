/**
 * Helper function to compute the contiguous segments of the data
 * @param {Array} lineData the line data
 * @param {Function} defined function that takes a data point and returns true if
 *    it is defined, false otherwise
 * @param {Function} isNext function that takes the previous data point and the
 *    current one and returns true if the current point is the expected one to
 *    follow the previous, false otherwise.
 * @return {Array} An array of segments (subarrays) of the line data
 */
function computeSegments(lineData, defined, isNext) {
  defined = defined || function (d) { return true; };
  isNext = isNext || function (prev, curr) { return true; };
  var startNewSegment = true;

  // split into segments of continuous data
  var segments = lineData.reduce(function (segments, d) {
    // skip if this point has no data
    if (!defined(d)) {
      startNewSegment = true;
      return segments;
    }

    // if we are starting a new segment, start it with this point
    if (startNewSegment) {
      segments.push([d]);
      startNewSegment = false;

    // otherwise see if we are adding to the last segment
    } else {
      var lastSegment = segments[segments.length - 1];
      var lastDatum = lastSegment[lastSegment.length - 1];
      // if we expect this point to come next, add it to the segment
      if (isNext(lastDatum, d)) {
        lastSegment.push(d);

      // otherwise create a new segment
      } else {
        segments.push([d]);
      }
    }

    return segments;
  }, []);

  return segments;
}

/**
 * Compute the gaps from segments. Takes an array of segments and creates new segments
 * based on the edges of adjacent segments.
 *
 * @param {Array} segments The segments array (e.g. from computeSegments)
 * @return {Array} gaps The gaps array (same form as segments, but representing spaces between segments)
 */
function gapsFromSegments(segments) {
  const gaps = [];
  for (var i = 0; i < segments.length - 1; i++) {
    const currSegment = segments[i];
    const nextSegment = segments[i + 1];

    gaps.push([currSegment[currSegment.length - 1], nextSegment[0]])
  }

  return gaps;
}

/**
 * Create the data for the gradient stops from the segments
 * @param {Array} segments The segments array (e.g. from computeSegments)
 * @param {Array} xDomain The xDomain that the path is created over.
 *   Used to map to 0 to 100% for the gradient stops. Uses linear scale.
 * @return {Array} The stops data
 */
function stopsFromSegments(segments, xDomain) {
  var gradientScale = d3.scaleLinear().domain(xDomain).range([0, 100]).clamp(true);

  var stops = segments.reduce(function (stops, segment) {
    // get first and last points from the segments
    var first = segment[0];
    var last = segment[segment.length - 1];

    // add gap-segment segment-gap stops (4)
    stops.push({ type: 'gap', offset: gradientScale(first[0]) + '%' });
    stops.push({ type: 'segment', offset: gradientScale(first[0]) + '%' });
    stops.push({ type: 'segment', offset: gradientScale(last[0]) + '%' });
    stops.push({ type: 'gap', offset: gradientScale(last[0]) + '%' });

    return stops;
  }, []);

  return stops;
}


function drawCircles(data, transition) {
  var binding = d3.select('svg').select('.circles')
    .selectAll('circle').data(data);

  const xMax = d3.max(data, d => d[0]);

  if (transition) {
    binding.exit().transition(transition)
      .attr('cx', xMax)
      .attr('r', 0)
      .remove();
  } else {
    binding.exit().remove();
  }

  let entering = binding.enter()
    .append('circle')
    .attr('cy', 3)
    .style('fill', function (d) { return d[1] === null ? '#fff' : '#0bb'; })
    .style('stroke', function (d) { return d[1] === null ? '#0bb' : '#fff'; });

  if (transition) {
    entering = entering
      .attr('cx', xMax)
      .attr('r', 0)
      .transition(transition)
  }

  entering
    .attr('cx', function (d) { return d[0]; })
    .attr('r', 3);


  if (transition) {
    binding = binding.transition(transition);
  }

  binding
    .attr('cx', function (d) { return d[0]; })
    .style('fill', function (d) { return d[1] === null ? '#fff' : '#0bb'; })
    .style('stroke', function (d) { return d[1] === null ? '#0bb' : '#fff'; })
    .attr('r', 3);

}